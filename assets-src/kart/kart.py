"""Modül kartlarının üst görselleri (0.43.0). Her modül için kitap kapağıyla aynı renklerde, koyu zeminli küçük bir vektör çizim.
Çizimler şemadır, veri grafiği değildir: eksen, sayı ya da ölçek taşımaz. Tek istisna MD-PDB'dir: ubikitin zinciri
kristal 1UBQ Cα koordinatlarından, kitabın kanonik görüşüyle çizilir (veri: ca_ubq3.npz, görüş: ubq_kanonik.json).
Kullanım: python3 assets-src/kart/kart.py [ca_ubq3.npz] [ubq_kanonik.json]   ->   static/assets/kart/<id>.svg
"""
import os, sys, json, math, random
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'static', 'assets', 'kart'); os.makedirs(OUT, exist_ok=True)
W, H = 600, 250
NIGHT, NIGHT2, TEAL, TEAL_D, AMBER, AMBER_D, MIST, CORAL = '#11252C', '#1B3A44', '#58C4B6', '#2F6E6A', '#E9C46A', '#9A6B0C', '#CFE6E2', '#E76F51'


def svg(body, defs=''):
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" preserveAspectRatio="xMidYMid slice">'
            '<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%s"/><stop offset="1" stop-color="%s"/></linearGradient>'
            '<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="%s" stop-opacity=".55"/><stop offset="1" stop-color="%s" stop-opacity="0"/></radialGradient>%s</defs>'
            '<rect width="%d" height="%d" fill="url(#bg)"/>%s</svg>\n') % (W, H, NIGHT, NIGHT2, AMBER, AMBER, defs, W, H, body)


def yaz(ad, govde, defs=''):
    open(os.path.join(OUT, ad.lower() + '.svg'), 'w', encoding='utf-8').write(svg(govde, defs))
    print('yazıldı', ad)


def f(x): return ('%.1f' % x).rstrip('0').rstrip('.')


# ---------- MD-T: potansiyel kuyusu, ayrık zaman adımlarında ilerleyen atom ----------
def md_t():
    # Lennard-Jones biçimli eğri (birimsiz şema)
    xs = np.linspace(0.9, 1.9, 160); V = 4 * ((1 / xs) ** 12 - (1 / xs) ** 6)
    X = 140 + (xs - 0.9) / (1.9 - 0.9) * 420; Y = 95 - V * 110
    Y = np.maximum(Y, -40)
    d = 'M' + ' L'.join('%s,%s' % (f(a), f(b)) for a, b in zip(X, Y))
    g = ['<path d="M120,%s H570" stroke="%s" stroke-opacity=".35" stroke-dasharray="3 6"/>' % (f(95), MIST)]
    g.append('<path d="%s" fill="none" stroke="%s" stroke-width="3.2" stroke-linecap="round"/>' % (d, TEAL))
    # zaman adımı izleri: eğri üzerinde eşit aralıklı olmayan (hızlanan) noktalar
    ts = [1.2, 1.15, 1.11, 1.075, 1.045, 1.02]
    for k, t in enumerate(ts):
        v = 4 * ((1 / t) ** 12 - (1 / t) ** 6); x = 140 + (t - 0.9) / (1.9 - 0.9) * 420; y = 95 - v * 110 - 12
        g.append('<circle cx="%s" cy="%s" r="%s" fill="%s" fill-opacity="%s"/>' % (f(x), f(y), f(4 + k * 0.8), AMBER, f(0.18 + k * 0.13)))
    t = 0.995; v = 4 * ((1 / t) ** 12 - (1 / t) ** 6); x = 140 + (t - 0.9) / (1.9 - 0.9) * 420; y = 95 - v * 110 - 14
    g.append('<circle cx="%s" cy="%s" r="34" fill="url(#glow)"/>' % (f(x), f(y)))
    g.append('<circle cx="%s" cy="%s" r="11" fill="%s" stroke="%s" stroke-width="2"/>' % (f(x), f(y), AMBER, NIGHT))
    # kuvvet oku
    g.append('<path d="M%s,%s h48" stroke="%s" stroke-width="3" stroke-linecap="round" marker-end="url(#ok)"/>' % (f(x + 16), f(y - 22), AMBER))
    g.append('<text x="%s" y="%s" font-family="Georgia,serif" font-style="italic" font-size="22" fill="%s">F</text>' % (f(x + 70), f(y - 15), AMBER))
    # sağda titreşen iki atomlu bağ (yay)
    yay = 'M438,172 ' + ' '.join('l7,%d' % (-9 if i % 2 == 0 else 9) for i in range(10)) + ' l6,0'
    g.append('<circle cx="428" cy="172" r="10" fill="%s"/>' % MIST)
    g.append('<path d="%s" fill="none" stroke="%s" stroke-width="2.2" stroke-linejoin="round"/>' % (yay, TEAL))
    g.append('<circle cx="522" cy="172" r="7" fill="%s"/>' % TEAL)
    defs = '<marker id="ok" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="%s"/></marker>' % AMBER
    yaz('MD-T', '\n'.join(g), defs)


# ---------- MD-PBC: kopyalanan kutu; kenardan çıkan molekül öbür kenardan girer ----------
def su(cx, cy, a, op, renk=MIST, oksi=CORAL, s=1.0):
    ca, sa = math.cos(a), math.sin(a)
    h = [(cx + s * (11 * ca - 7 * sa), cy + s * (11 * sa + 7 * ca)), (cx + s * (-11 * ca - 7 * sa), cy + s * (-11 * sa + 7 * ca))]
    o = ''.join('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="%s"/>' % (f(cx), f(cy), f(x), f(y), renk, f(2.4 * s)) for x, y in h)
    o += ''.join('<circle cx="%s" cy="%s" r="%s" fill="%s"/>' % (f(x), f(y), f(4 * s), renk) for x, y in h)
    o += '<circle cx="%s" cy="%s" r="%s" fill="%s"/>' % (f(cx), f(cy), f(7 * s), oksi)
    return '<g opacity="%s">%s</g>' % (f(op), o)


def md_pbc():
    L = 150; x0, y0 = 225, 50
    rnd = random.Random(4)
    mol = [(rnd.uniform(14, L - 14), rnd.uniform(14, L - 14), rnd.uniform(0, 6.28)) for _ in range(4)]
    mol.append((L - 4, 70, 0.6))  # sağ kenardan taşan molekül
    g = []
    for i in range(-3, 4):
        for j in range(-1, 2):
            ox, oy = x0 + i * L, y0 + j * L; ana = (i == 0 and j == 0)
            g.append('<rect x="%s" y="%s" width="%d" height="%d" fill="%s" fill-opacity="%s" stroke="%s" stroke-opacity="%s" stroke-width="%s"/>'
                     % (ox, oy, L, L, TEAL, '.10' if ana else '0', TEAL, '1' if ana else '.28', '2.6' if ana else '1.2'))
            for (mx, my, a) in mol:
                g.append(su(ox + mx, oy + my, a, 1 if ana else 0.3, s=1.25))
    # taşan molekülün öbür kenardaki görüntüsü vurgusu
    g.append('<circle cx="%s" cy="%s" r="26" fill="none" stroke="%s" stroke-width="2" stroke-dasharray="4 4"/>' % (f(x0 + L - 4), f(y0 + 70), AMBER))
    g.append('<circle cx="%s" cy="%s" r="26" fill="none" stroke="%s" stroke-width="2" stroke-dasharray="4 4"/>' % (f(x0 - 4), f(y0 + 70), AMBER))
    yaz('MD-PBC', '\n'.join(g))


# ---------- MD-CUT: kesme yarıçapı ve komşu listesi tamponu ----------
def md_cut():
    rnd = random.Random(11); cx, cy = 300, 125; rc, rl = 82, 104
    pts = []
    while len(pts) < 150:
        x, y = rnd.uniform(-20, W + 20), rnd.uniform(-20, H + 20)
        if all((x - a) ** 2 + (y - b) ** 2 > 26 ** 2 for a, b in pts) and (x - cx) ** 2 + (y - cy) ** 2 > 30 ** 2:
            pts.append((x, y))
        if rnd.random() < 0.0005: break
    g = ['<circle cx="%d" cy="%d" r="%d" fill="%s" fill-opacity=".05" stroke="%s" stroke-opacity=".55" stroke-width="1.5" stroke-dasharray="2 5"/>' % (cx, cy, rl, TEAL, TEAL)]
    g.append('<circle cx="%d" cy="%d" r="%d" fill="%s" fill-opacity=".10" stroke="%s" stroke-width="2.6" stroke-dasharray="10 6"/>' % (cx, cy, rc, TEAL, TEAL))
    for x, y in pts:
        r = math.hypot(x - cx, y - cy)
        if r < rc:
            g.append('<line x1="%d" y1="%d" x2="%s" y2="%s" stroke="%s" stroke-opacity=".35" stroke-width="1.3"/>' % (cx, cy, f(x), f(y), TEAL))
            g.append('<circle cx="%s" cy="%s" r="6.5" fill="%s"/>' % (f(x), f(y), TEAL))
        elif r < rl:
            g.append('<circle cx="%s" cy="%s" r="6" fill="none" stroke="%s" stroke-width="2"/>' % (f(x), f(y), TEAL))
        else:
            g.append('<circle cx="%s" cy="%s" r="5" fill="%s" fill-opacity=".22"/>' % (f(x), f(y), MIST))
    g.append('<circle cx="%d" cy="%d" r="36" fill="url(#glow)"/>' % (cx, cy))
    g.append('<circle cx="%d" cy="%d" r="11" fill="%s" stroke="%s" stroke-width="2"/>' % (cx, cy, AMBER, NIGHT))
    g.append('<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="%s" stroke-width="2.2"/>' % (cx + 12, cy, cx + rc, cy, AMBER))
    g.append('<text x="%d" y="%d" font-family="Georgia,serif" font-style="italic" font-size="19" fill="%s">r<tspan font-size="13" dy="4">c</tspan></text>' % (cx + 36, cy - 8, AMBER))
    yaz('MD-CUT', '\n'.join(g))


# ---------- MD-PDB: ubikitin (1UBQ, kristal Cα) ve çevresindeki su noktaları (şema) ----------
def md_pdb(npz, scene):
    u = np.load(npz); K = u['kristal'].astype(float)
    M = np.array(json.load(open(scene))['view'][:9]).reshape(3, 3); c0 = K[:70].mean(0)
    Y = (K - c0) @ M; P = np.c_[Y[:, 0], -Y[:, 1]]; z = Y[:, 2]
    lo, hi = P.min(0), P.max(0); s = min(420 / (hi - lo)[0], 210 / (hi - lo)[1])
    P = (P - (lo + hi) / 2) * s + np.array([W / 2, H / 2 + 4]); zt = (z - z.min()) / (z.max() - z.min())

    def parca(i):
        n = len(P); p0, p1, p2, p3 = P[max(i - 1, 0)], P[i], P[i + 1], P[min(i + 2, n - 1)]
        c1 = p1 + (p2 - p0) / 6; c2 = p2 - (p3 - p1) / 6
        return 'M%s,%s C%s,%s %s,%s %s,%s' % tuple(f(v) for v in (*p1, *c1, *c2, *p2))

    def karis(a, b, t):
        A = [int(a[k:k + 2], 16) for k in (1, 3, 5)]; B = [int(b[k:k + 2], 16) for k in (1, 3, 5)]
        return '#%02X%02X%02X' % tuple(int(round(x + (y - x) * t)) for x, y in zip(A, B))
    g = []
    # su noktaları: proteinin çevresinde, rastgele (şema; kristal su konumları değildir)
    rnd = random.Random(58); cen = P.mean(0); wat = []
    while len(wat) < 46:
        i = rnd.randrange(76); d = P[i] - cen; d = d / (np.linalg.norm(d) + 1e-9)
        q = P[i] + d * rnd.uniform(20, 46) + np.array([rnd.uniform(-10, 10), rnd.uniform(-10, 10)])
        if np.min(np.linalg.norm(P - q, axis=1)) > 16 and all(np.linalg.norm(q - w) > 15 for w in wat) and 8 < q[0] < W - 8 and 8 < q[1] < H - 8:
            wat.append(q)
    for q in wat:
        g.append('<circle cx="%s" cy="%s" r="4.2" fill="%s" fill-opacity=".55"/>' % (f(q[0]), f(q[1]), '#7FB7E6'))
    g.append('<g fill="none" stroke-linecap="round">')
    for i in sorted(range(75), key=lambda i: (zt[i] + zt[i + 1]) / 2):
        t = (zt[i] + zt[i + 1]) / 2; w = 6 + 6 * t; kuyruk = i >= 69
        col = karis(AMBER_D, AMBER, t) if kuyruk else karis(TEAL_D, '#E4F5F1', t)
        g.append('<path d="%s" stroke="%s" stroke-width="%s" stroke-linecap="butt"/>' % (parca(i), NIGHT, f(w + 4)))
        g.append('<path d="%s" stroke="%s" stroke-width="%s"/>' % (parca(i), col, f(w)))
    g.append('</g>')
    yaz('MD-PDB', '\n'.join(g))


# ---------- MD-FES: iki havzalı serbest enerji yüzeyi ve seyrek bir geçiş (şema) ----------
def md_fes():
    from skimage import measure
    nx, ny = 300, 125
    X, Yy = np.meshgrid(np.linspace(-1, 1, nx), np.linspace(-1, 1, ny))
    F = (-1.25 * np.exp(-((X + 0.5) ** 2 / 0.06 + (Yy + 0.1) ** 2 / 0.12)) - 0.8 * np.exp(-((X - 0.55) ** 2 / 0.05 + (Yy - 0.2) ** 2 / 0.07))
         - 0.35 * np.exp(-((X + 0.1) ** 2 / 0.4 + (Yy - 0.6) ** 2 / 0.2)) + 0.25 * (X ** 2 + Yy ** 2))
    g = []
    lv = np.linspace(F.min() + 0.06, F.min() + 1.4, 12)
    for k, L in enumerate(lv):
        t = k / (len(lv) - 1)
        for c in measure.find_contours(F, L):
            pts = ' L'.join('%s,%s' % (f(p[1] / (nx - 1) * W), f(p[0] / (ny - 1) * H)) for p in c[::2])
            col = AMBER if t < 0.25 else TEAL
            g.append('<path d="M%s" fill="none" stroke="%s" stroke-opacity="%s" stroke-width="%s"/>' % (pts, col, f(0.95 - 0.6 * t), f(2.2 - 1.2 * t)))
    # havzalarda örnekleme noktaları ve seyrek geçiş yolu
    rnd = random.Random(19)
    for (mx, my, sx, sy, n) in ((0.25, 0.45, 0.07, 0.13, 70), (0.775, 0.6, 0.05, 0.09, 9)):
        for _ in range(n):
            g.append('<circle cx="%s" cy="%s" r="2.2" fill="%s" fill-opacity=".75"/>' % (f(rnd.gauss(mx, sx) * W), f(rnd.gauss(my, sy) * H), MIST))
    g.append('<path d="M%s,%s C%s,%s %s,%s %s,%s" fill="none" stroke="%s" stroke-width="2.4" stroke-dasharray="1 7" stroke-linecap="round"/>'
             % (f(0.3 * W), f(0.42 * H), f(0.45 * W), f(0.2 * H), f(0.6 * W), f(0.3 * H), f(0.75 * W), f(0.58 * H), AMBER))
    yaz('MD-FES', '\n'.join(g))


# ---------- DK-T: cep, yerleşmiş ligand ve aramada denenen soluk pozlar ----------
def ligand(x, y, a, s, op, renk):
    ca, sa = math.cos(a), math.sin(a)
    T = lambda u, v: (x + s * (u * ca - v * sa), y + s * (u * sa + v * ca))
    halka = [T(18 * math.cos(math.pi / 3 * k + math.pi / 6), 18 * math.sin(math.pi / 3 * k + math.pi / 6)) for k in range(6)]
    d = 'M' + ' L'.join('%s,%s' % (f(p[0]), f(p[1])) for p in halka) + 'Z'
    zincir = [T(15.6, 9), T(36, 0), T(54, 10), T(72, 0)]
    z = 'M' + ' L'.join('%s,%s' % (f(p[0]), f(p[1])) for p in zincir)
    uc = T(72, 0); n = T(-15.6, 9)
    return ('<g opacity="%s" fill="none" stroke="%s" stroke-width="%s" stroke-linejoin="round" stroke-linecap="round"><path d="%s"/><path d="%s"/>'
            '<circle cx="%s" cy="%s" r="%s" fill="%s" stroke="none"/><circle cx="%s" cy="%s" r="%s" fill="#7FB7E6" stroke="none"/></g>') % (
        f(op), renk, f(3.2 * s), d, z, f(uc[0]), f(uc[1]), f(5.5 * s), CORAL, f(n[0]), f(n[1]), f(4.6 * s))


def dk_t():
    # cebi olan protein yüzeyi: alttan gelen kütle, ortada yarık
    yuzey = ('M-10,260 L-10,96 C70,74 140,110 196,98 C236,90 232,150 262,168 C292,186 336,184 360,166 '
             'C392,142 376,100 420,94 C480,86 540,70 610,88 L610,260 Z')
    g = ['<path d="%s" fill="%s" fill-opacity=".22" stroke="%s" stroke-width="2.6"/>' % (yuzey, TEAL, TEAL)]
    # yüzeydeki atom dokusu
    rnd = random.Random(3)
    for _ in range(90):
        x, y = rnd.uniform(0, W), rnd.uniform(196, 252)
        g.append('<circle cx="%s" cy="%s" r="%s" fill="%s" fill-opacity=".14"/>' % (f(x), f(y), f(rnd.uniform(5, 11)), TEAL))
    for (x, y, a, op) in ((110, 40, -0.5, .24), (470, 34, 0.4, .24), (250, 36, 0.9, .2), (380, 54, -1.1, .22)):
        g.append(ligand(x, y, a, 0.9, op, MIST))
    g.append('<ellipse cx="306" cy="146" rx="74" ry="34" fill="url(#glow)"/>')
    g.append(ligand(268, 148, -0.08, 1.15, 1, AMBER))
    yaz('DK-T', '\n'.join(g))



# ===================== 0.43.0, ikinci parti: kalan 21 modül (hepsi şema) =====================
BLUE = '#7FB7E6'


def yol(P): return 'M' + ' L'.join('%s,%s' % (f(x), f(y)) for x, y in P)


def daire(x, y, r, fill, op=1, extra=''):
    return '<circle cx="%s" cy="%s" r="%s" fill="%s" fill-opacity="%s"%s/>' % (f(x), f(y), f(r), fill, f(op), extra)


def yazi(x, y, t, renk, boy=20, italik=True, anchor='middle'):
    return '<text x="%s" y="%s" font-family="Georgia,serif"%s font-size="%s" fill="%s" text-anchor="%s">%s</text>' % (
        f(x), f(y), ' font-style="italic"' if italik else '', f(boy), renk, anchor, t)


def gurultu(n, seed, s=1.0, tau=6):  # yumuşatılmış rastgele dizi (şema)
    r = random.Random(seed); a = [r.gauss(0, 1) for _ in range(n + tau)]
    return [s * sum(a[i:i + tau]) / math.sqrt(tau) for i in range(n)]


# ---------- DK-O: beş kilit; aynı ligand, cebin farklı biçimleri ----------
def dk_o():
    g = []
    for k in range(5):
        d = k - 2
        yuzey = ('M-10,260 L-10,%s C70,%s 140,%s 196,%s C236,%s %s,150 262,%s C292,%s 336,%s 360,%s '
                 'C392,142 %s,100 420,%s C480,86 540,%s 610,88 L610,260 Z') % (
            f(96 + 7 * d), f(74 + 5 * d), f(110 - 7 * d), f(98 + 6 * d), f(90 + 7 * d), f(232 + 9 * d), f(168 + 6 * d),
            f(186 - 4 * d), f(184 + 6 * d), f(166 - 6 * d), f(376 - 9 * d), f(94 + 7 * d), f(70 - 5 * d))
        g.append('<path d="%s" fill="%s" fill-opacity="%s" stroke="%s" stroke-opacity="%s" stroke-width="%s"/>' % (
            yuzey, TEAL, '0' if k != 2 else '.16', TEAL, '.95' if k == 2 else '.35', '2.6' if k == 2 else '1.3'))
    for x, y in ((236, 132), (330, 128), (352, 150), (226, 156)):
        g.append(daire(x, y, 5.5, BLUE, .8))
    g.append('<ellipse cx="306" cy="146" rx="74" ry="34" fill="url(#glow)"/>')
    g.append(ligand(268, 148, -0.08, 1.15, 1, AMBER))
    yaz('DK-O', '\n'.join(g))


# ---------- DK-U: doz-yanıt eğrisi ve skora göre sıralanan bileşikler ----------
def dk_u():
    g = []
    X = np.linspace(0, 1, 120); Y = 1 / (1 + np.exp(-(X - 0.5) * 11))
    P = [(50 + x * 290, 210 - y * 160) for x, y in zip(X, Y)]
    g.append('<path d="M50,212 H350 M50,212 V40" stroke="%s" stroke-opacity=".35" stroke-width="1.4"/>' % MIST)
    g.append('<path d="%s" fill="none" stroke="%s" stroke-width="3.2" stroke-linecap="round"/>' % (yol(P), TEAL))
    r = random.Random(7)
    for x in np.linspace(0.05, 0.95, 9):
        y = 1 / (1 + math.exp(-(x - 0.5) * 11)) + r.uniform(-0.06, 0.06)
        g.append(daire(50 + x * 290, 210 - y * 160, 6, AMBER))
    # sağda sıralı liste: etkin (kehribar) ve tuzak (soluk) karışık
    sira = [1, 1, 0, 1, 0, 0, 1, 0, 0, 0]
    for i, e in enumerate(sira):
        y = 38 + i * 19; w = 150 - i * 9
        g.append('<rect x="400" y="%s" width="%s" height="11" rx="5.5" fill="%s" fill-opacity="%s"/>' % (f(y), f(w), AMBER if e else MIST, '.95' if e else '.28'))
    yaz('DK-U', '\n'.join(g))


# ---------- MD-ELEC: iyon kristali ve çözeltide perdelenmiş iyonlar ----------
def md_elec():
    g = []
    for i in range(7):
        for j in range(5):
            x, y = 22 + i * 40, 30 + j * 48; art = (i + j) % 2 == 0; op = max(0.15, 1 - i * 0.13)
            g.append('<g opacity="%s">%s%s</g>' % (f(op), daire(x, y, 14 if art else 11, AMBER if art else TEAL),
                     yazi(x, y + 6, '+' if art else '−', NIGHT, 18, False)))
    r = random.Random(5)
    for k in range(9):
        x, y = r.uniform(340, 580), r.uniform(30, 220); art = k % 2 == 0
        g.append('<circle cx="%s" cy="%s" r="34" fill="%s" fill-opacity=".14"/>' % (f(x), f(y), TEAL if art else AMBER))
        g.append('<circle cx="%s" cy="%s" r="21" fill="%s" fill-opacity=".18"/>' % (f(x), f(y), TEAL if art else AMBER))
        g.append(daire(x, y, 12 if art else 10, AMBER if art else TEAL))
        g.append(yazi(x, y + 6, '+' if art else '−', NIGHT, 17, False))
    yaz('MD-ELEC', '\n'.join(g))


# ---------- MD-EQ: minimizasyonla düşen enerji ve hedef bandına oturan sıcaklık ----------
def md_eq():
    g = []
    P = [(40 + k * 18, 40 + 150 * (1 - math.exp(-k / 3.0))) for k in range(14)]
    bas = [P[0]]
    for a, b in zip(P, P[1:]): bas += [(b[0], a[1]), b]
    g.append('<path d="%s" fill="none" stroke="%s" stroke-width="3" stroke-linejoin="round"/>' % (yol(bas), TEAL))
    for x, y in P[::2]: g.append(daire(x, y, 4.5, TEAL))
    n = gurultu(140, 3, 0.9, 4)
    Q = [(300 + i * 2, 125 + 80 * math.exp(-i / 18) * math.cos(i / 4) + 9 * n[i]) for i in range(140)]
    g.append('<rect x="300" y="110" width="280" height="30" fill="%s" fill-opacity=".10"/>' % AMBER)
    g.append('<path d="M300,125 H580" stroke="%s" stroke-dasharray="5 5" stroke-width="1.5"/>' % AMBER)
    g.append('<path d="%s" fill="none" stroke="%s" stroke-width="2.2"/>' % (yol(Q), AMBER))
    yaz('MD-EQ', '\n'.join(g))


# ---------- MD-O: histidinin üç protonlanma durumu ----------
def imidazol(cx, cy, s, h_d, h_e, vurgu):
    pts = [(cx + s * math.cos(-math.pi / 2 + 2 * math.pi * k / 5), cy + s * math.sin(-math.pi / 2 + 2 * math.pi * k / 5)) for k in range(5)]
    o = '<path d="%sZ" fill="%s" fill-opacity=".10" stroke="%s" stroke-width="3" stroke-linejoin="round"/>' % (yol(pts), TEAL, TEAL if not vurgu else AMBER)
    for i, hv in ((1, h_d), (3, h_e)):  # halka: CG(0), ND1(1), CE1(2), NE2(3), CD2(4)
        x, y = pts[i]; dx, dy = x - cx, y - cy; L = math.hypot(dx, dy)
        if hv:
            hx, hy = x + dx / L * 26, y + dy / L * 26
            o += '<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="2.6"/>' % (f(x), f(y), f(hx), f(hy), MIST)
            o += daire(hx, hy, 6, MIST)
        o += daire(x, y, 9, BLUE)
    tx, ty = pts[0]
    o += '<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="3"/>' % (f(tx), f(ty), f(tx), f(ty - 30), TEAL)
    if vurgu:
        o += '<circle cx="%s" cy="%s" r="%s" fill="url(#glow)"/>' % (f(cx), f(cy), f(s * 2))
        o += yazi(cx + s + 12, cy - s + 4, '+', AMBER, 26, False)
    return o


def md_o():
    g = [imidazol(130, 140, 42, True, False, False), imidazol(300, 140, 42, False, True, False), imidazol(470, 140, 42, True, True, True)]
    yaz('MD-O', '\n'.join(g))


# ---------- MD-DT: hızlı bağ titreşimi ve onu örnekleyen zaman adımları ----------
def md_dt():
    g = []
    X = np.linspace(20, 580, 500)
    g.append('<path d="%s" fill="none" stroke="%s" stroke-opacity=".35" stroke-width="2"/>' % (yol([(x, 175 + 30 * math.sin((x - 20) / 60)) for x in X]), MIST))
    g.append('<path d="%s" fill="none" stroke="%s" stroke-width="2.6"/>' % (yol([(x, 95 + 45 * math.sin((x - 20) / 14)) for x in X]), TEAL))
    for k, x in enumerate(np.arange(24, 580, 22)):
        y = 95 + 45 * math.sin((x - 20) / 14)
        g.append('<line x1="%s" y1="22" x2="%s" y2="228" stroke="%s" stroke-opacity=".12"/>' % (f(x), f(x), MIST))
        g.append(daire(x, y, 5, AMBER))
    yaz('MD-DT', '\n'.join(g))


# ---------- MD-U: zaman serisi ve blok ortalamaları ----------
def md_u():
    g = []
    n = gurultu(270, 21, 1.0, 14)
    P = [(30 + i * 2, 80 + 28 * n[i]) for i in range(270)]
    g.append('<path d="%s" fill="none" stroke="%s" stroke-width="1.8"/>' % (yol(P), TEAL))
    B = 6; m = 270 // B
    for b in range(B):
        seg = n[b * m:(b + 1) * m]; mu = sum(seg) / len(seg); x0 = 30 + b * m * 2
        g.append('<rect x="%s" y="150" width="%s" height="70" rx="4" fill="%s" fill-opacity=".08" stroke="%s" stroke-opacity=".4"/>' % (f(x0 + 3), f(m * 2 - 6), TEAL, TEAL))
        g.append('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="3" stroke-linecap="round"/>' % (f(x0 + 14), f(185 + 22 * mu), f(x0 + m * 2 - 14), f(185 + 22 * mu), AMBER))
    g.append('<path d="M30,185 H570" stroke="%s" stroke-opacity=".4" stroke-dasharray="3 5"/>' % MIST)
    yaz('MD-U', '\n'.join(g))


# ---------- MD-ENS: topluluk dağılımı; ortalama ile en olası konum ----------
def md_ens():
    g = []
    r = random.Random(8)
    xs = [r.gauss(0.42, 0.11) for _ in range(900)] + [r.gauss(0.72, 0.06) for _ in range(350)]
    bins = np.histogram(xs, bins=34, range=(0.05, 0.95))[0]; mx = bins.max()
    for i, c in enumerate(bins):
        x = 40 + i * 15.3; h = 170 * c / mx
        g.append('<rect x="%s" y="%s" width="12" height="%s" rx="2" fill="%s" fill-opacity=".75"/>' % (f(x), f(222 - h), f(h), TEAL))
    mu = sum(xs) / len(xs); x = 40 + (mu - 0.05) / 0.9 * 34 * 15.3
    g.append('<line x1="%s" y1="30" x2="%s" y2="226" stroke="%s" stroke-width="2.6" stroke-dasharray="6 5"/>' % (f(x), f(x), AMBER))
    g.append('<path d="M30,224 H570" stroke="%s" stroke-opacity=".4"/>' % MIST)
    yaz('MD-ENS', '\n'.join(g))


# ---------- MD-CON: nefes alan kutu ve hedef etrafında dalgalanan sıcaklık ----------
def md_con():
    g = []
    for k, s in enumerate((150, 140, 132)):
        g.append('<rect x="%s" y="%s" width="%s" height="%s" fill="none" stroke="%s" stroke-opacity="%s" stroke-width="%s"/>' % (
            f(130 - s / 2), f(125 - s / 2), f(s), f(s), TEAL, ('.3', '1', '.3')[k], ('1.4', '2.6', '1.4')[k]))
    r = random.Random(2)
    for _ in range(26): g.append(daire(r.uniform(72, 188), r.uniform(67, 183), 4.5, MIST, .6))
    n = gurultu(170, 9, 1.0, 6)
    g.append('<path d="M260,125 H580" stroke="%s" stroke-width="1.6" stroke-dasharray="5 5"/>' % AMBER)
    g.append('<path d="%s" fill="none" stroke="%s" stroke-width="2.2"/>' % (yol([(260 + i * 1.9, 125 + 13 * n[i]) for i in range(170)]), AMBER))
    yaz('MD-CON', '\n'.join(g))


# ---------- MD-REP: kuyu plakası; tekrarlar ----------
def md_rep():
    g = []
    r = random.Random(12)
    for i in range(12):
        for j in range(5):
            x, y = 52 + i * 45, 37 + j * 44; v = r.random()
            g.append(daire(x, y, 16, TEAL, .08, ' stroke="%s" stroke-opacity=".45" stroke-width="1.4"' % TEAL))
            if v > 0.45: g.append(daire(x, y, 11, TEAL, 0.25 + 0.5 * v))
    for i, j in ((3, 2), (4, 2), (5, 2)):
        x, y = 52 + i * 45, 37 + j * 44
        g.append(daire(x, y, 22, 'none', 0, ' stroke="%s" stroke-width="2.6"' % AMBER)); g.append(daire(x, y, 11, AMBER))
    yaz('MD-REP', '\n'.join(g))


# ---------- MD-Q: jel bandından iddia merdivenine ----------
def md_q():
    g = ['<rect x="40" y="26" width="60" height="200" rx="5" fill="%s" fill-opacity=".08" stroke="%s" stroke-opacity=".5"/>' % (TEAL, TEAL)]
    for y, w, op in ((60, 44, .5), (98, 44, .9), (150, 44, .35), (188, 44, .6)):
        g.append('<rect x="%s" y="%s" width="%s" height="9" rx="4" fill="%s" fill-opacity="%s"/>' % (f(70 - w / 2), f(y), f(w), AMBER if y == 98 else MIST, f(op)))
    for k in range(5):
        x0, y = 170 + k * 80, 210 - k * 38
        g.append('<path d="M%s,%s H%s V%s" fill="none" stroke="%s" stroke-width="2.6"/>' % (f(x0), f(y), f(x0 + 80), f(y - 38), TEAL))
        g.append('<rect x="%s" y="%s" width="60" height="7" rx="3.5" fill="%s" fill-opacity=".25"/>' % (f(x0 + 10), f(y - 20), MIST))
    g.append('<path d="M108,102 C140,102 150,185 186,192" fill="none" stroke="%s" stroke-width="2" stroke-dasharray="3 6" stroke-linecap="round"/>' % AMBER)
    g.append('<circle cx="290" cy="134" r="26" fill="url(#glow)"/>' + daire(290, 128, 9, AMBER))
    yaz('MD-Q', '\n'.join(g))


# ---------- MD-TRJ: kutu sınırında bölünen yol ve birleştirilmiş gerçek yol ----------
def md_trj():
    g = ['<rect x="190" y="35" width="220" height="180" fill="%s" fill-opacity=".07" stroke="%s" stroke-width="2.4"/>' % (TEAL, TEAL)]
    n1, n2 = gurultu(220, 31, 1.0, 10), gurultu(220, 32, 1.0, 10)
    P = []; x, y = 300, 125
    for i in range(220): x += 2.2 + 3 * n1[i]; y += 3.4 * n2[i]; P.append((x, y))
    g.append('<path d="%s" fill="none" stroke="%s" stroke-width="2.4" stroke-opacity=".9"/>' % (yol(P), AMBER))
    W2 = [((a - 190) % 220 + 190, (b - 35) % 180 + 35) for a, b in P]
    parca = [[W2[0]]]
    for a, b in zip(W2, W2[1:]):
        if abs(a[0] - b[0]) > 50 or abs(a[1] - b[1]) > 50: parca.append([b])
        else: parca[-1].append(b)
    for p in parca:
        if len(p) > 1: g.append('<path d="%s" fill="none" stroke="%s" stroke-width="1.8" stroke-opacity=".55"/>' % (yol(p), MIST))
    g.append(daire(300, 125, 6, AMBER)); g.append(daire(*P[-1], 6, AMBER))
    yaz('MD-TRJ', '\n'.join(g))


# ---------- MD-MET: kare çifti RMSD matrisi (şema) ----------
def md_met():
    g = []
    n = 22; s = 9.6; x0, y0 = 330, 19
    blok = [0] * 8 + [1] * 6 + [2] * 8
    r = random.Random(4)
    for i in range(n):
        for j in range(n):
            d = 0.12 if blok[i] == blok[j] else (0.55 if abs(blok[i] - blok[j]) == 1 else 0.9)
            d = min(1, max(0, d + r.uniform(-0.08, 0.08) + 0.012 * abs(i - j)))
            col = AMBER if d < 0.3 else TEAL
            g.append('<rect x="%s" y="%s" width="%s" height="%s" fill="%s" fill-opacity="%s"/>' % (f(x0 + j * s), f(y0 + i * s), f(s - 1), f(s - 1), col, f(0.95 - 0.75 * d)))
    for k, col in enumerate((TEAL, AMBER)):
        nn = gurultu(40, 40 + k, 1.0, 5)
        P = [(50 + i * 6, 125 + 40 * math.sin(i / 5) + 12 * nn[i]) for i in range(40)]
        g.append('<path d="%s" fill="none" stroke="%s" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".85"/>' % (yol(P), col))
    yaz('MD-MET', '\n'.join(g))


# ---------- MD-PCA: kümeler ve temel bileşen eksenleri ----------
def md_pca():
    g = []; r = random.Random(16)
    for (mx, my, sx, sy, n, col) in ((180, 150, 40, 22, 120, TEAL), (330, 90, 30, 18, 80, AMBER), (450, 165, 34, 20, 90, MIST)):
        for _ in range(n): g.append(daire(r.gauss(mx, sx), r.gauss(my, sy), 3.2, col, .7))
        g.append('<ellipse cx="%s" cy="%s" rx="%s" ry="%s" fill="none" stroke="%s" stroke-width="1.6" stroke-dasharray="4 4"/>' % (mx, my, f(sx * 2.1), f(sy * 2.1), col))
    defs = '<marker id="ok2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="%s"/></marker>' % MIST
    g.append('<path d="M70,215 L560,95" stroke="%s" stroke-width="2.2" marker-end="url(#ok2)"/>' % MIST)
    g.append('<path d="M300,190 L270,60" stroke="%s" stroke-width="1.6" stroke-opacity=".6" marker-end="url(#ok2)"/>' % MIST)
    yaz('MD-PCA', '\n'.join(g), defs)


# ---------- MD-INT: hidrojen bağı (uzaklık ve açı) ve tuz köprüsü ----------
def md_int():
    g = []
    D, Hh, A = (110, 150), (160, 130), (250, 100)
    g.append('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="4"/>' % (*D, *Hh, MIST))
    g.append('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="3" stroke-dasharray="3 7" stroke-linecap="round"/>' % (*Hh, *A, AMBER))
    g.append('<path d="M70,180 L%s,%s" stroke="%s" stroke-width="4"/><path d="M%s,%s L300,70" stroke="%s" stroke-width="4"/>' % (*D, TEAL, *A, TEAL))
    g.append(daire(*D, 13, BLUE) + daire(*Hh, 8, MIST) + daire(*A, 13, CORAL))
    g.append('<path d="M138,138 A30,30 0 0 1 140,124" fill="none" stroke="%s" stroke-width="2"/>' % AMBER)
    g.append(yazi(200, 92, 'r', AMBER, 20))
    for (x, y, art) in ((390, 150, True), (500, 110, False)):
        g.append('<circle cx="%s" cy="%s" r="40" fill="%s" fill-opacity=".12"/>' % (x, y, AMBER if art else TEAL))
        g.append(daire(x, y, 18, AMBER if art else TEAL) + yazi(x, y + 7, '+' if art else '−', NIGHT, 22, False))
    g.append('<line x1="410" y1="142" x2="480" y2="117" stroke="%s" stroke-width="2.4" stroke-dasharray="3 6" stroke-linecap="round"/>' % MIST)
    yaz('MD-INT', '\n'.join(g))


# ---------- MD-FAIL: çakışan atomlar ve dağılan sistem ----------
def md_fail():
    g = []; r = random.Random(13); cx, cy = 230, 128
    for k in range(30):
        a = r.uniform(0, 6.28); d = r.uniform(0, 48)
        g.append(daire(cx + d * math.cos(a), cy + d * math.sin(a), 7, TEAL, .85))
    for k in range(9):
        a = -0.9 + k * 0.23 + r.uniform(-0.05, 0.05); d0, d1 = 60, r.uniform(130, 260)
        x0, y0, x1, y1 = cx + d0 * math.cos(a), cy + d0 * math.sin(a), cx + d1 * math.cos(a), cy + d1 * math.sin(a)
        g.append('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-opacity=".45" stroke-width="2" stroke-dasharray="2 6" stroke-linecap="round"/>' % (f(x0), f(y0), f(x1), f(y1), CORAL))
        g.append(daire(x1, y1, 6.5, CORAL))
    g.append(daire(cx - 10, cy + 4, 10, AMBER) + daire(cx + 2, cy + 2, 10, AMBER, .85))
    g.append('<path d="M70,200 L100,148 L130,200 Z" fill="none" stroke="%s" stroke-width="3" stroke-linejoin="round"/>' % AMBER)
    g.append(yazi(100, 194, '!', AMBER, 28, False))
    yaz('MD-FAIL', '\n'.join(g))


# ---------- MD-FF: kuvvet alanının terimleri: bağ, açı, dihedral, van der Waals ----------
def md_ff():
    g = []
    yay = 'M48,125 ' + ' '.join('l7,%d' % (-10 if i % 2 == 0 else 10) for i in range(8)) + ' l6,0'
    g.append(daire(38, 125, 11, MIST) + '<path d="%s" fill="none" stroke="%s" stroke-width="2.4"/>' % (yay, TEAL) + daire(118, 125, 11, MIST))
    g.append('<path d="M180,165 L225,95 L270,165" fill="none" stroke="%s" stroke-width="3.4"/>' % TEAL)
    g.append(daire(180, 165, 10, MIST) + daire(225, 95, 11, MIST) + daire(270, 165, 10, MIST))
    g.append('<path d="M209,120 A30,30 0 0 0 241,120" fill="none" stroke="%s" stroke-width="2.4"/>' % AMBER)
    g.append('<circle cx="365" cy="125" r="42" fill="none" stroke="%s" stroke-width="2.6"/>' % TEAL)
    for a, col in ((-90, MIST), (30, MIST), (150, MIST)):
        g.append('<line x1="365" y1="125" x2="%s" y2="%s" stroke="%s" stroke-width="3"/>' % (f(365 + 42 * math.cos(math.radians(a))), f(125 + 42 * math.sin(math.radians(a))), col))
    for a in (-30, 90, 210):
        g.append('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="3"/>' % (f(365 + 42 * math.cos(math.radians(a))), f(125 + 42 * math.sin(math.radians(a))), f(365 + 66 * math.cos(math.radians(a))), f(125 + 66 * math.sin(math.radians(a))), AMBER))
    xs = np.linspace(0.93, 2.2, 80); V = 4 * ((1 / xs) ** 12 - (1 / xs) ** 6)
    P = [(450 + (x - 0.93) / 1.27 * 130, max(30, 105 - v * 75)) for x, v in zip(xs, V)]
    g.append('<path d="M450,105 H585" stroke="%s" stroke-opacity=".35" stroke-dasharray="3 5"/>' % MIST)
    g.append('<path d="%s" fill="none" stroke="%s" stroke-width="2.8"/>' % (yol(P), TEAL))
    yaz('MD-FF', '\n'.join(g))


# ---------- MD-SOLV: su dolu kutu ve az sayıda iyon ----------
def md_solv():
    g = ['<rect x="60" y="25" width="480" height="200" rx="4" fill="%s" fill-opacity=".06" stroke="%s" stroke-width="2.4"/>' % (TEAL, TEAL)]
    r = random.Random(23); pts = []
    while len(pts) < 230:
        x, y = r.uniform(72, 528), r.uniform(37, 213)
        if all((x - a) ** 2 + (y - b) ** 2 > 13 ** 2 for a, b in pts): pts.append((x, y))
    ion = set(r.sample(range(len(pts)), 10))
    for k, (x, y) in enumerate(pts):
        if k in ion:
            art = len([i for i in ion if i < k]) % 2 == 0
            g.append(daire(x, y, 11, AMBER if art else CORAL) + yazi(x, y + 5, '+' if art else '−', NIGHT, 15, False))
        else:
            g.append(daire(x, y, 3.4, BLUE, .55))
    yaz('MD-SOLV', '\n'.join(g))


# ---------- MD-LIG: kısmi yükleriyle bir ligand ----------
def md_lig():
    g = []; s = 30; cx, cy = 210, 125
    A = [(cx + s * math.cos(math.pi / 3 * k + math.pi / 6), cy + s * math.sin(math.pi / 3 * k + math.pi / 6)) for k in range(6)]
    B = [(a + s * math.sqrt(3), b) for a, b in A]
    zincir = [B[0], (B[0][0] + 30, B[0][1] + 17), (B[0][0] + 60, B[0][1]), (B[0][0] + 90, B[0][1] + 17), (B[0][0] + 120, B[0][1])]
    yuk = {('A', 3): CORAL, ('B', 5): BLUE, ('Z', 2): CORAL, ('Z', 4): BLUE, ('A', 1): BLUE}
    for n, P, kapali in (('A', A, True), ('B', B, True), ('Z', zincir, False)):
        for k, (x, y) in enumerate(P):
            c = yuk.get((n, k))
            if c: g.append('<circle cx="%s" cy="%s" r="30" fill="%s" fill-opacity=".22"/>' % (f(x), f(y), c))
    for P, kapali in ((A, True), (B, True), (zincir, False)):
        g.append('<path d="%s%s" fill="none" stroke="%s" stroke-width="4" stroke-linejoin="round"/>' % (yol(P), 'Z' if kapali else '', AMBER))
    for (n, k), c in yuk.items():
        P = {'A': A, 'B': B, 'Z': zincir}[n]; g.append(daire(*P[k], 7.5, c))
    yaz('MD-LIG', '\n'.join(g))


# ---------- MD-ERR: güven aralıklarının dansı ----------
def md_err():
    g = ['<line x1="300" y1="14" x2="300" y2="236" stroke="%s" stroke-width="2" stroke-dasharray="5 5"/>' % MIST]
    r = random.Random(29)
    for k in range(20):
        y = 18 + k * 11.2; m = r.gauss(0, 50); w = r.uniform(70, 110); kac = abs(m) > w
        col = CORAL if kac else TEAL
        g.append('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="2.4" stroke-linecap="round"/>' % (f(300 + m - w), f(y), f(300 + m + w), f(y), col))
        g.append(daire(300 + m, y, 4, AMBER if not kac else CORAL))
    yaz('MD-ERR', '\n'.join(g))


# ---------- MD-REPRO: aynı başlangıçtan ayrılan iki koşu ----------
def md_repro():
    g = []
    n0, n1, n2 = gurultu(260, 50, 1.0, 16), gurultu(260, 51, 1.0, 20), gurultu(260, 52, 1.0, 20)
    for k, (col, n) in enumerate(((TEAL, n1), (AMBER, n2))):
        P = []
        for i in range(260):
            ayr = 0 if i < 80 else ((i - 80) / 180) ** 1.5
            P.append((40 + i * 2.05, 125 + 40 * math.sin(i / 20) + 10 * n0[i] + 40 * ayr * n[i]))
        g.append('<path d="%s" fill="none" stroke="%s" stroke-width="2.8" stroke-opacity=".95" stroke-linecap="round"/>' % (yol(P), col))
    g.append('<line x1="204" y1="20" x2="204" y2="230" stroke="%s" stroke-opacity=".35" stroke-dasharray="3 6"/>' % MIST)
    g.append(daire(40, 125 + 10 * n0[0], 7, MIST))
    yaz('MD-REPRO', '\n'.join(g))


IKINCI = [dk_o, dk_u, md_elec, md_eq, md_o, md_dt, md_u, md_ens, md_con, md_rep, md_q, md_trj, md_met, md_pca, md_int, md_fail, md_ff, md_solv, md_lig, md_err, md_repro]


if __name__ == '__main__':
    npz = sys.argv[1] if len(sys.argv) > 1 else None; scene = sys.argv[2] if len(sys.argv) > 2 else None
    md_t(); md_pbc(); md_cut(); md_fes(); dk_t()
    for fn in IKINCI: fn()
    if npz and scene: md_pdb(npz, scene)
    else: print('MD-PDB atlandı: ca_ubq3.npz ve ubq_kanonik.json yolu verilmedi')

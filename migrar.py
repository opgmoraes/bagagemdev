import re, os, shutil

subfolders = ["areas", "area", "recursos", "ferramentas", "quiz", "vagas", "produtos", "admin"]
old_names = {
    "areas": "areas.html",
    "area": "area-detalhe.html",
    "recursos": "recursos.html",
    "ferramentas": "ferramentas.html",
    "quiz": "quiz.html",
    "vagas": "vagas.html",
    "produtos": "produtos.html",
    "admin": "admin.html",
}

# 1. Criar pastas e mover os arquivos
for folder, old in old_names.items():
    if not os.path.exists(old):
        print(f"pulei (não encontrado): {old}")
        continue
    os.makedirs(folder, exist_ok=True)
    shutil.move(old, f"{folder}/index.html")
    print(f"movido: {old} -> {folder}/index.html")

# 2. Ajustar caminhos dentro de cada página movida
for folder in subfolders:
    path = f"{folder}/index.html"
    if not os.path.exists(path):
        continue
    with open(path, encoding="utf-8") as f:
        content = f.read()

    content = re.sub(r'href="css/', 'href="../css/', content)
    content = re.sub(r'src="js/', 'src="../js/', content)

    mapping = {
        'href="index.html"': 'href="../"',
        'href="areas.html"': 'href="../areas/"',
        'href="area-detalhe.html"': 'href="../area/"',
        'href="recursos.html"': 'href="../recursos/"',
        'href="ferramentas.html"': 'href="../ferramentas/"',
        'href="quiz.html"': 'href="../quiz/"',
        'href="vagas.html"': 'href="../vagas/"',
        'href="produtos.html"': 'href="../produtos/"',
        'href="admin.html"': 'href="../admin/"',
    }
    for old, new in mapping.items():
        content = content.replace(old, new)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"caminhos ajustados: {path}")

# 3. Ajustar links de navegação do index.html da raiz (css/js continuam iguais)
if os.path.exists("index.html"):
    with open("index.html", encoding="utf-8") as f:
        content = f.read()
    mapping_root = {
        'href="areas.html"': 'href="areas/"',
        'href="area-detalhe.html"': 'href="area/"',
        'href="recursos.html"': 'href="recursos/"',
        'href="ferramentas.html"': 'href="ferramentas/"',
        'href="quiz.html"': 'href="quiz/"',
        'href="vagas.html"': 'href="vagas/"',
        'href="produtos.html"': 'href="produtos/"',
        'href="admin.html"': 'href="admin/"',
    }
    for old, new in mapping_root.items():
        content = content.replace(old, new)
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("caminhos ajustados: index.html (raiz)")

# 4. Ajustar links dinâmicos gerados via JavaScript
js_fixes = {
    "js/areas.js": [
        ('href="area-detalhe.html?slug=${area.slug}"', 'href="../area/?slug=${area.slug}"'),
    ],
    "js/index.js": [
        ('href="area-detalhe.html?slug=${area.slug}"', 'href="area/?slug=${area.slug}"'),
        ('href="produtos.html"', 'href="produtos/"'),
    ],
    "js/quiz.js": [
        ('`area-detalhe.html?slug=${resultSlug}`', '`../area/?slug=${resultSlug}`'),
    ],
}
for path, fixes in js_fixes.items():
    if not os.path.exists(path):
        print(f"AVISO: não encontrei {path}, ajuste manual necessário")
        continue
    with open(path, encoding="utf-8") as f:
        content = f.read()
    for old, new in fixes:
        if old not in content:
            print(f"AVISO: padrão não encontrado em {path}: {old}")
        content = content.replace(old, new)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"links dinâmicos ajustados: {path}")

print("\n✅ Migração concluída. Confira o resultado e depois delete este migrar.py")
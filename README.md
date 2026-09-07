# nadinegartner.com — Deploy-Artefakt (nicht direkt bearbeiten)

Dieses Repo enthält **nur die generierte, öffentliche Website** von
[nadinegartner.com](https://nadinegartner.com/) und wird über **GitHub Pages** ausgeliefert.

> ⚠️ **Nicht hier bearbeiten.** Der Inhalt wird bei jedem Deploy per **force push**
> vollständig überschrieben. Änderungen bitte im Quell-Repo vornehmen.

## Quelle & Bearbeitung

- **Quell-Repo:** [tillg/nadinegartner.com_src](https://github.com/tillg/nadinegartner.com_src)
- Dort liegen die Original-Dateien, der lokale Redaktions-Editor und das Build-Skript
  (`build-public.sh`). Eine GitHub-Action baut daraus dieses Artefakt und pusht es hierher.

```
tillg/nadinegartner.com_src  --build + push-->  tillg/nadinegartner.com (dieses Repo)  --Pages-->  nadinegartner.com
```

Diese Datei wird aus `README.public.md` im Quell-Repo erzeugt.

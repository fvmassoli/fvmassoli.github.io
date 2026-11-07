# Personal academic website (Jekyll + GitHub Pages)

No theme, no build pipeline: GitHub Pages builds this repo natively.

## Deploy (5 minutes)
1. Create a **public** repo named exactly `<your-github-username>.github.io`.
2. Copy these files into it, then:
   ```bash
   git init && git add . && git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:<username>/<username>.github.io.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `/ (root)`.
4. Site is live at `https://<username>.github.io` within ~1 minute.

## Edit content (you rarely touch HTML)
| What | File |
|---|---|
| Name, role, links, interests | `_config.yml` |
| Papers | `_data/publications.yml` |
| News | `_data/news.yml` |
| Talks | `_data/talks.yml` |
| FAQ | `_data/faq.yml` |
| Bio / CV | `bio.md`, `assets/files/cv.pdf` |
| Photo | `assets/img/profile.jpg` (update `photo:` in `_config.yml`) |
| Blog post | add `_posts/YYYY-MM-DD-title.md` |

## Preview locally (optional)
```bash
bundle install
bundle exec jekyll serve --livereload   # http://localhost:4000
```

## Custom domain (optional)
Add a file `CNAME` containing `yourname.com`, set DNS per GitHub docs,
then enable *Enforce HTTPS* in Settings → Pages.

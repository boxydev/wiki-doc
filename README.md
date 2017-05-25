# WikiDoc

TODO :
- Automatiser les builds et le déploiement sur gh-pages
 
Pour le moment :
- git branch -D gh-pages
- git checkout --orphan gh-pages
- git rm -r --cached .
- git add -f dist
- git commit -m "Build $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
- git push origin `git subtree split --prefix dist gh-pages`:gh-pages --force
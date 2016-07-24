# import packages
apm install --packages-file ./configs/atom.packages.txt

# export packages
apm list --installed --bare > ./configs/atom.packages.txt

---
title: Installer Arch Linux
---

# Installer Arch Linux

Nous nous sommes inspirés du <a href="https://wiki.archlinux.org/index.php/Installation_guide" target="_blank">Wiki original d'Arch Linux</a> tout en gardant les étapes les plus importantes. N'hésitez pas à apporter vos modifications sur le Github si besoin.

## Pré-installation

On commence par aller chercher <a href="http://mir.archlinux.fr/iso/latest/" target="_blank">la dernière ISO</a>. On boot sur le live CD. Chez Boxydev, toutes les cartes mères ont un système UEFI mais on peut vérifier que l'on est bien sur ce mode.

```bash
$ ls /sys/firmware/efi/efivars
```

On vérifie que l'on est bien connecté à Internet.

```bash
$ ping boxydev.com
```

### Partition des disques

On vérifie les disques et on choisit celui sur lequel on veut installer notre Arch.

```bash
$ fdisk -l
```

Une fois le disque /dev/sdX choisi, on peut utiliser cfdisk qui est plus facile, bien sûr le X est à remplacer par la lettre du disque dur concerné.

```bash
$ cfdisk /dev/sdX
```

Au plus simple, il y a 2 partitions à faire :
- La partition racine ```/``` (```/dev/sdX1``` dans notre exemple).
- La partition EFI ou ESP (```/dev/sdX2``` dans notre exemple).

Chez Boxydev, nous installons Windows sur nos machines (baaaaaaah) avant Linux car c'est le seul moyen d'avoir un dual boot correct (Windows n'accepte qu'un ESP vide sans Linux...). De ce fait, la partition EFI est forcément existante donc n'a pas besoin d'être créé mais juste monté.

### Formater / Monter les partitions

On peut maintenant formatter et monter les partitions (Attention, on ne formatte pas la partition EFI).

```bash
mkfs.ext4 /dev/sdX1
mount /dev/sdX1 /mnt
mkdir -p /mnt/boot/efi
mount /dev/sdX2 /mnt/boot/efi
```

On utilisera <a href="https://git.archlinux.org/arch-install-scripts.git/tree/genfstab.in" target="_blank">genfstab</a> plus tard pour générer le fichier ```/etc/fstab``` sans se prendre la tête.

## Installation

Passons maintenant à l'installation de notre OS préféré. On va commencer par utiliser le script pacstrap afin de bootstrapper le système de base.

```bash
pacstrap /mnt base
```

Voilà, c'est terminé, une installation Linux plus simple que celle de Windows.

## Configuration du système

### Fstab

Il faut générer le fichier ```/etc/fstab``` afin que les partitions soient automatiquement montées au démarrage. Nous l'avons déjà fait alors ne nous répétons pas.

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

Un petit ```cat /mnt/etc/fstab``` nous permet de checker que tout s'est bien passé.

### Chroot

On peut maintenant se chrooter dans la matrice.

```bash
arch-chroot /mnt
```

### La timezone

On se branche sur Paris.

```bash
ln -sf /usr/share/zoneinfo/Europe/Paris /etc/localtime
```

### Les locales

On décommente ```en_US.UTF-8 UTF-8``` et ```fr_FR.UTF-8 UTF-8``` dans le fichier ```/etc/locale.gen``` et on génére le fichier.

```bash
locale-gen
```

On set la variable d'environnement.

```bash
nano /etc/locale.conf
LANG=fr_FR.UTF-8
```

On fait la même chose pour le clavier français.

```bash
nano /etc/vconsole.conf 
KEYMAP=fr
```

### Hostname

On configure le hostname.

```bash
nano /etc/hostname
myhostname
```

Et on fait aussi le fichier hosts.

```bash
nano /etc/hosts
127.0.0.1   localhost.localdomain	localhost
::1         localhost.localdomain	localhost
127.0.1.1   myhostname.localdomain   myhostname
```

### Mot de passe root

On configure le mot de passe root.

```bash
passwd
```

### Chargeur de démarrage

Chez Boxydev, on choisit Grub 2. On va donc l'installer avec efibootmgr et os-prober.

```bash
pacman -S grub efibootmgr os-prober
```

Efibootmgr peut servir à clean certaines entrées qui ne sont plus utilisées dans le menu UEFI.

On pose Grub dans le repertoire boot, on génére le fichier de configuration et c'est terminé pour Grub.

```bash
mkdir -p /boot/efi/EFI/arch
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=arch --recheck
grub-mkconfig -o /boot/grub/grub.cfg
```

### Reboot

On peut maintenant redémarrer le système après avoir démonter les partitions ```umount -R /mnt```

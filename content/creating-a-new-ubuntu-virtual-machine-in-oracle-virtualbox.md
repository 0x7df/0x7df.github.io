Title: Creating a new Ubuntu virtual machine in Oracle VirtualBox
Date: 2015-04-26 12:29
Updated: 2020-09-18 17:02
Author: 0x7df
Category: Programming
Tags: linux, ubuntu, virtual machine, virtualbox, vm
Slug: creating-a-new-ubuntu-virtual-machine-in-oracle-virtualbox
Status: published

These instructions are for a Windows host machine. An article
[here](http://osxdaily.com/2012/03/27/install-run-ubuntu-linux-virtualbox/)
gives instructions for Mac OS X, but are unlikely to be very different. This
assumes you've already
[downloaded](https://www.virtualbox.org/wiki/Downloads) and
[installed](https://www.virtualbox.org/manual/ch02.html) VirtualBox.

Create the VM
-------------

1.  Open the Oracle VM VirtualBox Manager. This brings up the window shown:
    ![Figure 1. Oracle VirtualBox VM Manager window.]({static}images/01_oracle_virtualbox_manager.png?w=276)
2.  Click "New" in the top-left corner. This brings up the "Create Virtual
    Machine" dialogue box:
    ![Figure 2. Create Virtual Machine dialogue box.]({static}images/02_create_vm_dialogue.png?w=300)
3.  Give the system a descriptive name, and select "Linux" from the "Type"
    drop-down menu, and then "Ubuntu (64 bit)" from the "Version" drop-down
    menu. (Obviously you can choose whatever you like at this point, I default
    to Ubuntu.) Click "Next".
4.  The next few dialogue boxes allow you to select how much memory you want,
    decide whether or not to create a virtual hard drive or not (or use an
    existing one), and assuming you do, define its properties (file format,
    whether or not to dynamically allocate storage, size (or maximum size), and
    location). Assuming you want to keep the defaults for all these, click
    "Next" or "Create" until you get to the end.
5.  You've finished the first phase and have been returned to the VirtualBox
    Manager window, and you should see the system you've just created in the
    list of available VMs on the left-hand side. If you click on it once, the
    details of the system will be shown in the right-hand pane. To launch it,
    either double-click, or click "Start" up at the top when the VM is selected.

Install the OS
--------------

1.  ![Figure 3. Select start-up disk dialogue box.]({static}images/03_select_start-up_disk_dialogue.png?w=300)
    The next step is to install the operating system. A "Select start-up
    disk" dialogue box comes up, with a drop-down menu. The default
    selection is "Host drive 'D:'". Rather than use a DVD installation
    disk however, I've previously downloaded an ISO disk image file. I
    can select this directly from the drop-down menu (see Figure)
    because I've used it before, so VirtualBox remembers its location.
    If this isn't the case for you, you can click the folder icon to the
    right of the drop-down menu, which opens up a file browser and
    allows you to navigate to wherever you stored the downloaded ISO
    file (look [here](http://www.ubuntu.com/download/desktop) for a
    download). Click "Start", and the VM will start to boot from the
    ISO.

2.  From here on the instructions are as to install Ubuntu from disk.
    Click through the defaults and self-explanatory settings, until the
    installation begins proper. This takes a while, and when it's
    complete you'll be prompted to restart.

Install Guest Additions
-----------------------

1.  When the restart has completed, you have working VM. However,
    there's something obviously wrong with the desktop. When you re-size
    the VM window, the desktop doesn't scale with it but remains a fixed
    size, which is way too small. This is because the resolution is
    fixed, and having the desktop size scale with the window size
    essentially means changing the VM screen resolution. To do this you
    need to install additional software on the VM, called the Guest
    Additions. The next stage is to install the Guest Additions.
2.  First, the Linux VM needs Dynamic Kernel Module Support (DKMS) to be
    installed. Open a terminal on the VM and run:

        :::bash
        sudo apt-get install dkms

    This allows it to build external module kernels.

3.  Select, from the VM's "Devices" menu, "Insert Guest Additions CD
    image...". This will open File Manager showing the contents of the
    CD, and the path, which will be something like:
    `/media/username/VBOXADDITIONS_4.3.26_98988/`.
4.  Return to the terminal, `cd` into the Guest Additions directory, then run:

        :::bash
        sudo sh ./VBoxLinuxAdditions.run

5.  Restart the VM. You're done.

Initial software stack
----------------------

While I try to have a VM for each project I'm working on, I start each
one with a few bits and pieces that I expect to find useful on most
projects. To make this as quick as possible I have [a script on
GitHub](https://github.com/0x7df/mkvm) that performs the installation
for me. To use this:

1.  Install git:
        
        :::bash
        sudo apt-get install git

2.  Clone the repository:

        :::bash
        git clone https://github.com/0x7df/mkvm.git

3.  Run the script:

        :::bash
        cd mkvm ; ./mkvm.sh

You can see the software that gets installed from the listing below:

    :::bash
    
    # mkvm - Make virtual machine
    # This script configures an Ubuntu virtual machine how I like it
     
    sudo apt-get -y update               # Must be done before upgrade
    sudo apt-get -y dist-upgrade         # Does upgrade with intelligent dependency-
                                         # handling
     
    sudo apt-get -y install dkms         # For installing VirtualBox Linux Guest
                                         # Additions (https://www.virtualbox.org/
                                         # manual/ch04.html)
    
    sudo apt-get -y install git
    sudo apt-get -y install nedit
    sudo apt-get -y install python-numpy # Contains, amongst other things, f2py
    sudo apt-get -y install python-dev   # For Python.h; required by f2py
    sudo apt-get -y install gfortran
    sudo apt-get -y install python-pip
    sudo apt-get -y install python-matplotlib
    sudo apt-get -y install okular
    sudo apt-get -y upgrade graphviz
    sudo apt-get -y install texlive
    sudo apt-get -y install doxygen
    
    sudo pip install robotframework
    sudo pip install prospector[with_frosted]
    sudo pip install prospector[with_pyroma]
    sudo pip install prospector[with_vulture]
    
    sudo add-apt-repository ppa:staticfloat/juliareleases
    sudo add-apt-repository ppa:staticfloat/julia-deps
    sudo apt-get -y install julia
    
    # python-scipy
    # matplotlib
    
    # If Java JDK is required, determine the path:
    #   > update-alternatives --config java
    # Set JAVA_HOME=/usr/bin/java (or wherever) in /etc/environment, which is the
    # preferred location for JAVA_HOME or any system variable.
    
    echo "
    # Now install the Linux Guest Additions for VirtualBox. Go to the
    # \"Devices\" menu of VirtualBox when the VM is running (make sure it is not in
    # stretch mode or the menu bar will not be visible); select \"Insert Guest
    # Additions CD image...\"; then run VBoxLinuxAdditions.run with administrator
    # privileges. Re-boot the VM; after this the VM desktop should resize with the
    # VirtualBox window, rather than being a fixed (small) size.
    "

Shared clipboard
----------------

One extra useful thing to do is enable the shared clipboard, which
allows copy-and-paste from the host to the guest, vice versa, or both.
Make sure the VM is shut down, select it in the VirtualBox Manager
window, go to "Settings", "General", "Advanced" and select from the
"Shared Clipboard" drop-down. Detailed descriptions with screen shots
are
[here](http://www.howtogeek.com/187535/how-to-copy-and-paste-between-a-virtualbox-host-machine-and-a-guest-machine).


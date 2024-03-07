# Post-Game Stats Writer
This is a simple tool for watching & writing post-game stats for Brawlhalla from a specified directory (your BrawlhallaStatDumps folder) into a specified file (your HTML outfile) based on a custom template (your HTML template file).

### Features
Immediately calculates & formats all stats provided in the `-writestats` JSON files generated after watching a match in-game. Any (text) file can be provided as a template; the application will do a find & replace for any **keys** within the file.

##### Keys
Keys are in the form `{object.property.property}`, e.g. `{player1.dmgTaken}`. No other text within the template file will be altered. This is particularly useful for creating displays within a local HTML webpage, as it can be regularly overwritten with whatever data you need. A full list of keys & their descriptors can be found in `./example.html`.

### Planned Features:
- [ ] Images Support
- [ ] Match Timeline Graph Generation
- [ ] 2v2 Support
- [ ] More Templates Available for Download


### Configuration
Configuration is done through the `stats-config.json` file. In it, you should provide the path to your BrawlhallaStatDumps folder (usually located in `C:\Users\<your user>\BrawlhallaStatDumps` for Windows). You should also provide a path to a file that is read in as a template, and a path to a file that the output will be written to.

### Installation
To install, simply download the latest executable for your platform found under the Releases section. It's recommended to run this within a command line/terminal so console messages will be logged. By default, the executable will run until it's closed - be sure to close it once you're finished using it.

All executables are compiled using the [pkg](https://npmjs.com/pkg) utility with default options (e.g., `pkg index.js`) - if you prefer, you can run it by using any Node version >16.x.x - it might work on lower Node versions, but I can't promise it will.

### Example Usage
This is a step-by-step guide to using the Post-Game Stats Writer on a Windows computer.

1. Edit your launch options within Steam settings to include the `-writestats` option.
2. Open (or restart if already opened) Brawlhalla.
3. Spectate any match, and search for your `BrawlhallaStatDumps` folder (normally located in your User folder [`C:\Users\<your user>\BrawlhallaStatDumps`]).
4. Create a new folder to hold the Post-Game Stats Writer & configuration file as well as the output file.
5. Download the latest index-win.exe from the releases section and move it to this new folder.
6. Download the `example.html` file and place it in this new folder.
7. Download the `stats-config.json` file and place it in this new folder. Edit it so that the `statsDumpDir` entry points to your BrawlhallaStatDumps folder.
8. Open this folder, right-click and open a command prompt in this folder.
9. Run the executable by typing `index-windows.exe`
10. If you get any errors, read the error and follow what it tells you - if you're experiencing issues, [contact me on Discord](https://discord.gg/aUgghaYjgx)!
11. Go back to Brawlhalla and spectate a **Stock 1v1 match**.
12. Open the newly created `out.html` file in your preferred browser - it should be updated the last spectated match's stats!
13. Modify the `example.html` file to your heart's content, and use it in your next tournament stream!

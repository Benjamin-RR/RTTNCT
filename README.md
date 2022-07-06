# RTTNCT
Redirects : Text to next.config - translator

# About this project
This project was thrown together very quickly with the intentions of instead of manually translating a txt file to a js file and it's hundreds of lines of code, to do it fully automatically.

# What it does
Reads every single line and translates each line with these set of rules : 
1. lines beginning with hash are commented lines.
2. lines with the word "Redirect" will be made into a json.
3. Lines including 301 will be given a "permenant: true" while lines including 302 will be given a "permenant: false".
4. Automatically detects your website's domain and adds the value "basePath: false" when your domain isn't used on a found redirect.
5. If a line does not include a hash (comment) or a Redirect, it will not be included in the js file.

# How to run.
Open in your coder and open a new live server. If you don't have already a simple vsCode extension "Live Server" exists that can make this step a one click process. Once installed a "Go Live" button on the bottom right of your vsCode will start up this project automatically.
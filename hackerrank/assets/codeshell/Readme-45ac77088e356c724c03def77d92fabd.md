## Dev setup:

First install npm and nodejs on your system.

Grunt command has to be global, but grunt package has to be local.

```npm -g install grunt-cli```

```npm install grunt```

Install dependencies.

```npm install```

Install Bower Components:

```bower install```

Build required JS files using grunt:

```grunt build```

Run the server using test.sh

## Demo:

https://www.hackerrank.com/challenges/utopian-tree

##Screenshots:

![Alt text](/Screenshots/Custom_test_cases.png?raw=true)

![Alt text](/Screenshots/Dragger.png?raw=true)

![Alt text](/Screenshots/Editor_pulled_to_right.png?raw=true)

![Alt text](/Screenshots/Editor_window.png?raw=true)

![Alt text](/Screenshots/Full_screen_mode.png?raw=true)

![Alt text](/Screenshots/Sample_Problem_Statement.png?raw=true)

![Alt text](/Screenshots/Slider_for_tabspaces.png?raw=true)

## Making a release.

Update bower.json and package.json. Then run ./release command as follows:
```./release.sh 0 0 36```

This will create a release with tag v0.0.36

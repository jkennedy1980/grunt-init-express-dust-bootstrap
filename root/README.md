# {%= name %}

{%= description %}

## Getting Started
Install {%= name %} with: `npm install -g {%= name %}` or clone repo [https://github.com/{%= git_user %}/{%= git_repo %}](https://github.com/{%= git_user %}/{%= git_repo %}).

```bash
$ git clone https://github.com/{%= git_user %}/{%= git_repo %}
$ cd {%= name %}
$ npm install
```

Run {%= name %} using:

```bash
$ {%= name %}
```

Or if you have cloned the repo:

```bash
$ grunt start
```

## License
Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.

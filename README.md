wicked-short
============

Simple short URL redirector that pulls its data from any YAML or JSON file.

I just wanted an easy way to bookmark and make my own custom URLs every time instead of relying on a 3rd party or a random algorithm to generate the short URLs.

## Running Locally

    > node index.js --data-uri URI_OF_YAML_OR_JSON

## Deploying

The only thing you need to do is set the environment variable `DATA_URI` to the URI of the YAML or JSON file you want.

## URI File

If the URI does not contain a file extension it will check the `Content-Type` header to verfiy it is JSON to parse it, if not, it will revert to YAML parsing.

### Options for File Editing/Hosting

- Public Dropbox file (my method)
- Commit to GitHub
- Amazon S3
- Any other public host

### Sample YAML

```yaml
---
  mg:
    link: "http://madglory.com"
    title: "MadGlory"
  bs:
    link: "http://blainsmith.com"
    title: "Blain Smith"
```

### Sample JSON

```json
{
  "mg": { 
    "link": "http://madglory.com", 
    "title": "MadGlory" 
  },
  "bs": { 
    "link": "http://blainsmith.com/", 
    "title": "Blain Smith"
  }
}
```
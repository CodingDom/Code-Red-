// src/app/pages /main-page.component.ts


import { Component, OnInit, ViewChild } from '@angular/core';

const defaultHTML = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
          background-color: #141414;
        }
        h1 {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Hello World</h1>
<script>
    
</script>
</body>
</html>`

@Component({
    selector: 'app-editor-page',
    templateUrl: './editor-page.component.html',
    styleUrls: ['./editor-page.component.scss']
}) export class EditorPageComponent implements OnInit {

    @ViewChild("editor", {static: true}) codeEditor; // editor component instance
    @ViewChild("iframe", {static: true}) idoc;
    constructor() { }

    update() {
      const idoc = this.idoc.nativeElement.contentWindow.document;
      idoc.open();
      idoc.write(this.codeEditor.getValue());
      idoc.close();
    }

    ngOnInit () { 
      this.codeEditor = window["ace"].edit("editor");
      this.codeEditor.setTheme("ace/theme/twilight");
      this.codeEditor.getSession().setMode("ace/mode/html");
      this.codeEditor.setValue(defaultHTML, 1); //1 = moves cursor to end
      this.update();
this.codeEditor.getSession().on('change', () => {
        this.update();
      });
      this.codeEditor.focus();
      this.codeEditor.setOptions({
        fontSize: "16pt",
        showLineNumbers: true,
        showGutter: true,
        vScrollBarAlwaysVisible: false,
      });
      this.codeEditor.setShowPrintMargin(false);
      this.codeEditor.setBehavioursEnabled(true);
    }
}
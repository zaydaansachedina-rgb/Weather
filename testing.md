FIRST TEST OF A HELLO WORLD

PS C:\Users\rizsa> curl http://localhost:3000/

Security Warning: Script Execution Risk
Invoke-WebRequest parses the content of the web page. Script code in the web page might be run when the page is
parsed.
      RECOMMENDED ACTION:
      Use the -UseBasicParsing switch to avoid script code execution.

      Do you want to continue?

[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"): a


StatusCode        : 200
StatusDescription : OK
Content           : hello world
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Content-Length: 11
                    Content-Type: text/html; charset=utf-8
                    Date: Tue, 01 Sep 2026 21:09:59 GMT
                    ETag: W/"b-Kq5sNclPz7QV2+lfQIuc6R7oRu0"...
Forms             : {}
Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5], [Content-Length, 11], [Content-Type,
                    text/html; charset=utf-8]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 11

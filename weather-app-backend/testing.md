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
PS C:\Users\rizsa> curl "http://localhost:3000/api/cities?q=toronto"


StatusCode        : 200
StatusDescription : OK
Content           : {"cityName":"Toronto"}
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Content-Length: 22
                    Content-Type: application/json; charset=utf-8
                    Date: Wed, 02 Sep 2026 13:38:54 GMT
                    ETag: W/"16-zSdveYBuPD3g5xZo+H0G...
Forms             : {}
Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5], [Content-Length, 22], [Content-Type,
                    application/json; charset=utf-8]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 22



PS C:\Users\rizsa> curl "http://localhost:3000/api/weather/43.70643/-79.39864"


StatusCode        : 200
StatusDescription : OK
Content           : {"weather":20.5}
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Content-Length: 16
                    Content-Type: application/json; charset=utf-8
                    Date: Wed, 02 Sep 2026 16:41:23 GMT
                    ETag: W/"10-b3LmorHHQMfvPWRU69Vz...
Forms             : {}
Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5], [Content-Length, 16], [Content-Type,
                    application/json; charset=utf-8]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 16


PS C:\Users\rizsa> curl "http://localhost:3000/api/weather/43.70643/-79.39864"


StatusCode        : 200
StatusDescription : OK
Content           : {"weather":20.5}
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Content-Length: 16
                    Content-Type: application/json; charset=utf-8
                    Date: Wed, 02 Sep 2026 16:41:23 GMT
                    ETag: W/"10-b3LmorHHQMfvPWRU69Vz...
Forms             : {}
Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5], [Content-Length, 16], [Content-Type,
                    application/json; charset=utf-8]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 16

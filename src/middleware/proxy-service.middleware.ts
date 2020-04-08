import { Injectable, NestMiddleware } from '@nestjs/common'
import { createProxyMiddleware }  from 'http-proxy-middleware'


@Injectable()
export class ProxyServiceMiddleware implements NestMiddleware {
  private getTargetUrl(req) {
    let targetUrl = null

    //Handle other routes
    //This can be externalized via YAML config to record src and target URLs
    //Use Consul registered URLs for target microservices
    console.log("URL :: " + req.url)
    console.log("ORIGINAL URL :: " + req.originalUrl)
    if (req.url.includes('/test')) {
      targetUrl = process.env.TEST_SERVICE_URL
    } else {
      console.log(req.url)
      //targetUrl = req.url   // need to exclude this 'htttp://localhost:3000/error' to avoid loop...
      //Need to handle error condition
    }

    return targetUrl
  }

  use(req: any, res: any, next: () => void) {
    const targetUrl = this.getTargetUrl(req)
    if (targetUrl) {
      const options = {
        target: targetUrl,
        secure: false,
        changeOrigin: false,
        onProxyRes: ((proxyRes, req, res) => {
          console.log("Received response from MS :: " + req.originalUrl)
        })
      }

      createProxyMiddleware(req.originalUrl, options).call(createProxyMiddleware, req, res, next)
    } else {
      next()
    }
  }
}

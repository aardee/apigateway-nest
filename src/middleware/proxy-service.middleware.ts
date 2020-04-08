import { Injectable, NestMiddleware } from '@nestjs/common'
import { createProxyMiddleware }  from 'http-proxy-middleware'


@Injectable()
export class ProxyServiceMiddleware implements NestMiddleware {
  private getTargetUrl(req) {
    console.log(req);
    let targetUrl = null

    //Handle other routes
    //This can be externalized via YAML config to record src and target URLs
    //Use Consul registered URLs for target microservices
    console.log(req.url)
    console.log(req.originalUrl)
    if (req.url.includes('/test')) {
      targetUrl = 'http://test-service:3002/'
    } else {
      console.log(req.url)
      //targetUrl = req.url   // need to exclude this 'htttp://localhost:3000/error' to avoid loop...
      //Need to handle error condition
    }

    return targetUrl
  }

  use(req: any, res: any, next: () => void) {
    console.log(req.headers['authorization'])

    const targetUrl = this.getTargetUrl(req)
    if (targetUrl) {
      const options = {
        target: targetUrl,
        secure: false,
        changeOrigin: false,
      }

      createProxyMiddleware(req.originalUrl, options).call(createProxyMiddleware, req, res, next)
    } else {
      next()
    }
  }
}

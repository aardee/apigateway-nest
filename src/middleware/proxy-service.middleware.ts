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
    if (req.url.includes('/apis/test')) {
      targetUrl = 'http://localhost:3002/'
    } else {
      targetUrl = 'error'   // need to exclude this 'htttp://localhost:3000/error' to avoid loop...
    }

    return targetUrl
  }

  use(req: any, res: any, next: () => void) {
    console.log(req.headers['authorization'])

    const options = {
      target: this.getTargetUrl(req),
      secure: false,
      changeOrigin: false,
    }

    createProxyMiddleware(req.originalUrl, options).call(createProxyMiddleware, req, res, next)
  }
}

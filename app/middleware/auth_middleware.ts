import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
   async handle({auth, response}: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    try {
      await auth.authenticate();
      return await next();
    } catch (e){
      return response.unauthorized({message: "You are not authorized!"});
    }
  }
}
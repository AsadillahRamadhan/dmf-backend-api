/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = async () => await import('#controllers/auth_controller')
const UsersController = async () => await import('#controllers/users_controller')
const DevicesController = async () => await import('#controllers/devices_controller')
const RpmsController = async () => await import('#controllers/rpms_controller')
const TemperatureController = async () => await import('#controllers/temperatures_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('register', [AuthController, 'register']).as('register')
  router.post('login', [AuthController, 'login']).as('login')

  router.resource('devices', DevicesController).apiOnly();
  router.resource('rpms', RpmsController).apiOnly();
  router.resource('temperatures', TemperatureController).apiOnly();
  router.get('/temperatures/latest/:device_id', [TemperatureController, 'latest']).as('temperatures.latest');
  router.get('/rpms/latest/:device_id', [RpmsController, 'latest']).as('rpms.latest');

  router.get('/history/temperature/:device_id', [TemperatureController, 'history']).as('temperatures.history');
  router.get('/history/rpm/:device_id', [RpmsController, 'history']).as('rpms.history');

router.group(() => {
    router.group(() => {
      router.get('/', [UsersController, 'index']).as('user.index')
      router.post('/', [UsersController, 'store']).as('user.store')
      router.get('/:id', [UsersController, 'show']).as('user.show')
      router.put('/:id', [UsersController, 'update']).as('user.update')
      router.put('/:id/avatar', [UsersController, 'changeAvatar']).as('user.changeAvatar')
      router.put('/:id/delete-avatar', [UsersController, 'deleteAvatar']).as('user.deleteAvatar')
      router.delete('/:id', [UsersController, 'delete']).as('user.delete')
    }).prefix('user').middleware(middleware.admin());
    router.post('logout', [AuthController, 'logout']).as('logout');

      router.get('/current-user', [AuthController, 'currentUser']).as('current-user');
    router.put('/change-avatar', [AuthController, 'changeAvatar']).as('change-avatar');
    router.put('/delete-avatar', [AuthController, 'deleteAvatar']).as('deleteAvatar');
  }).middleware(middleware.auth());

}).prefix('api')

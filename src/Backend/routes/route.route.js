import express from 'express'
import { routeConTroller } from '../controllers/route.controller.js'
const router = express.Router();

router.get('/', routeConTroller.getRoute);

router.get('/admin/routes', routeConTroller.getRoutesAdmin);
router.get('/admin/:routeId', routeConTroller.getRouteByIdAdmin);
router.delete('/admin/:routeId', routeConTroller.deleteRouteByIdAdmin);
router.post('/admin', routeConTroller.createRouteAdmin);
router.post('/admin/stop', routeConTroller.createStopAdmin);
router.put('/admin/:routeId', routeConTroller.updateRouteAdmin);


export default router;
import { Router } from "express";
import { instanceRoutes } from "./instance";

const routes = Router()


routes.use('/instance/', instanceRoutes)

export { routes }
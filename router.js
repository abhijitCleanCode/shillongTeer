import {Router} from "express"

import * as preCont from "./controller/previousCont.js"
import * as comCont from "./controller/commonCont.js"

const router = Router()

router.post('/addAndUpdateFRSR',preCont.addAndUpdateFRSR)
router.get('/getPrevious',preCont.getPrevious)
router.get('/addManyPreviousResult',preCont.addManyPreviousResult)


router.post('/addCommon',comCont.addCommon)
router.get('/getCommon',comCont.getCommon)


export {router}
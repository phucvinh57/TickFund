import { Router, Request, Response } from 'express'

const router: Router = Router();

router.post('/new', function (req: Request, res: Response) {
    res.json('Create new transaction')
})

router.get('/:id', function (req: Request, res: Response) {
    res.json(`Get info of transaction ${req.params.id}`)
})

export default router;
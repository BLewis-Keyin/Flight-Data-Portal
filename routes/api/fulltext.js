var router = require('express').Router();
const mDal = require('../../services/m.fulltext.dal')
const pgDal = require('../../services/pg.fulltext.dal')

// api/full
router.get('/m/:text', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/full/m/ GET ' + req.params.text);
    try {
        let theText = await mDal.getFullText(req.params.text); 
        if(theText.length === 0) {
          res.statusCode = 404;
          res.json({message: "Not Found", status: 404});
        } else
        res.json(theText);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

router.get('/pg/:text', async (req, res) => {
  if(DEBUG) console.log('ROUTE: /api/full/pg/ GET ' + req.params.text);
  try {
      let theText = await pgDal.getFullText(req.params.text); 
      if(theText.length === 0) {
        res.statusCode = 404;
        res.json({message: "Not Found", status: 404});
      } else
        res.json(theText);
  } catch {
      // log this error to an error log file.
      res.statusCode = 503;
      res.json({message: "Service Unavailable", status: 503});
  }
});

module.exports = router;
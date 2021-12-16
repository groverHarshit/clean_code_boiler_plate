const UserRoutes = require('./user.routes');
const PumpRoutes = require('./Pump.routes');
const BookingRoutes = require('./booking.routes');
const { multerService } = require('../services')

module.exports = (app) => {
  app.use('/api/v1/users', UserRoutes);
  app.use('/api/v1/pump', PumpRoutes);
  app.use('/api/v1/booking', BookingRoutes);

  app.post('/upload', multerService.uploadSingle('file'), (req, res) => res.status(200).json({ success: true, path: req.file.path.replace('public/', '') }));

  app.use('**', (req, res) => res.status(404).json({ success: false, message: "Route not found" }));
}

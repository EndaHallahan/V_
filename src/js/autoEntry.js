const v_ = require("./V_.js");

window.v_ify = v_.v_ify;
window.V_ = v_.V_;

window.addEventListener("load", () => {
	v_.v_ify();
}, false);

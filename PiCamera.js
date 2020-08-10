const PiCamera = require("pi-camera");

const takePicture = async () => {
    const myCamera = new PiCamera({
        mode: "photo",
        output: `${__dirname}/pokeScan.jpg`,
        width: 640,
        height: 480,
        nopreview: true,
    });

    try {
        const result = await myCamera.snap();
        return true;
    } catch (e) {
        console.log(e);
        return "Error while taking picture";
    }
}

exports.takePicture = takePicture;
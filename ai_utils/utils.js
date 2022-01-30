const keyFilename = "credentials/client.json";
const projectId = "youtubeapi-testing-321117";
const { DocumentProcessorServiceClient } =
  require("@google-cloud/documentai").v1;
const { Storage } = require("@google-cloud/storage");
const bucketName = "my--first-test-images";

const storage = new Storage({ projectId, keyFilename });

async function uploadFile(fileName, customerId) {
  const path = `public/${fileName}`;
  try {
    const destFileName = `${customerId}-${fileName}`;
    await storage.bucket(bucketName).upload(path, {
      destination: destFileName,
    });
  } catch (e) {
    console.log(e);
  }
}

// uploadFile(filePath);

// download the objecdt
async function downloadFile(fileName) {
  const destFileName = `./public/${fileName}`;
  const bucketName = "my--first-test-images";
  const options = {
    destination: destFileName,
  };

  // Downloads the file
  await storage.bucket(bucketName).file(fileName).download(options);

  console.log(`gs://${bucketName}/${fileName} downloaded to ${destFileName}.`);
  return fileName;
}

const client1 = new DocumentProcessorServiceClient({ projectId, keyFilename });

async function processDocument(fileName) {
  const filePath = `./public/${fileName}`;

  const projectId1 = "437335402199";
  const location = "us";
  const processorId1 = "efd8b8c8472e83e1";
  const name = `projects/${projectId1}/locations/${location}/processors/${processorId1}`;
  // const name = "projects/437335402199/locations/us/processors/803ebd2248a1011f";

  // Read the file into memory.
  const fs = require("fs").promises;
  const imageFile = await fs.readFile(filePath);
  // console.log(imageFile);
  // Convert the image data to a Buffer and base64 encode it.
  const encodedImage = Buffer.from(imageFile).toString("base64");

  const request = {
    name,
    rawDocument: {
      content: encodedImage,
      mimeType: "application/pdf",
    },
  };

  // console.log("running");
  // Recognizes text entities in the PDF document
  const [result] = await client1.processDocument(request);
  const { document } = result;

  // Get all of the document text as one big string
  const { text } = document;
  return text;
}
module.exports = {
  downloadFile,
  processDocument,
  uploadFile,
};

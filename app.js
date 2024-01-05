const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
    brokers: ['127.0.0.1:9092']
});

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
});

const runProducer = async () => {
    await producer.connect();

    const topic = 'testing';

    // Fungsi untuk mengirim pesan ke Kafka
    const sendMessage = async () => {
        const message = { value: `Message sent at ${new Date().toLocaleTimeString()}` };
        await producer.send({
            topic,
            messages: [message]
        });
        console.log('Message sent:', message.value);
    };

    // Mengatur interval untuk mengirim pesan setiap 5 detik
    setInterval(sendMessage, 5000);
};

runProducer().catch(console.error);

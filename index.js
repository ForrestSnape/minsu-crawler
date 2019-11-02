const { promisify } = require('util');
const { readFile, writeFile } = require('fs');
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class App {
    orders = [];

    async run() {
        await this.airbnb();
        await this.xiaozhu();
        await this.tujia();
        await this.zhenguo();
        await writeFileAsync('json/order.json', JSON.stringify(this.orders));
    }

    async airbnb() {
        const data = JSON.parse((await readFileAsync('json/airbnb.json')).toString());
        const roomArr = [
            { no: 27119668, room: '12B37' },
            { no: 25556932, room: '1522' },
            { no: 27811813, room: '1926' },
            { no: 27499278, room: '1927' },
        ];
        for (const order of data) {
            this.orders.push({
                room: roomArr.filter(item => item.no === order.listing_id)[0].room,
                platform: 'airbnb',
                startDate: order.start_date,
                endDate: order.end_date,
                earnings: parseFloat(order.earnings).toFixed(2)
            });
        }
    }

    async xiaozhu() {
        const data = JSON.parse((await readFileAsync('json/xiaozhu.json')).toString());
        const roomArr = [
            { no: '35700680503', room: '12B37' },
            { no: '31393986003', room: '1522' },
            { no: '38743160303', room: '1926' },
            { no: '37291210603', room: '1927' },
        ];
        for (let order of data) {
            this.orders.push({
                room: roomArr.filter(item => item.no === order.luId)[0].room,
                platform: 'xiaozhu',
                startDate: order.checkInDate,
                endDate: order.checkOutDate,
                earnings: parseFloat(order.charge).toFixed(2)
            });
        }
    }

    async tujia() {
        const data = JSON.parse((await readFileAsync('json/tujia.json')).toString());
        const roomArr = [
            { no: 5265304, room: '12B37' },
            { no: 4723252, room: '12B37' },
            { no: 2774072, room: '1522' },
            { no: 5511459, room: '1926' },
            { no: 5136651, room: '1927' },
        ];
        for (const order of data) {
            this.orders.push({
                room: roomArr.filter(item => item.no === order.unitId)[0].room,
                platform: 'tujia',
                startDate: order.checkInDate,
                endDate: order.checkOutDate,
                earnings: (parseFloat(order.totalUnitAmount) * 0.9).toFixed(2)
            })
        }
    }

    async zhenguo() {
        const data = JSON.parse((await readFileAsync('json/zhenguo.json')).toString());
        const roomArr = [
            { no: 2648189, room: '12B37' },
            { no: 2682947, room: '1522' },
            { no: 3082504, room: '1926' },
            { no: 2763310, room: '1927' },
            { no: 6480130, room: '2130' }
        ];
        for (const order of data) {
            const checkinDate = String(order.checkinDate);
            const checkoutDate = String(order.checkoutDate);
            this.orders.push({
                room: roomArr.filter(item => item.no === order.productFlat.productId)[0].room,
                platform: 'zhenguo',
                startDate: `${checkinDate.substr(0, 4)}-${checkinDate.substr(4, 2)}-${checkinDate.substr(6, 2)}`,
                endDate: `${checkoutDate.substr(0, 4)}-${checkoutDate.substr(4, 2)}-${checkoutDate.substr(6, 2)}`,
                earnings: (parseFloat(order.incomeMoney) / 100).toFixed(2)
            })
        }
    }

}

const app = new App();
app.run();



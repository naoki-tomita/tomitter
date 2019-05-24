import {GlobalWithFetchMock} from "jest-fetch-mock";

const customGlobal: GlobalWithFetchMock = window as unknown as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

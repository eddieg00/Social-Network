const express = require('express');
const mongodb = require("./config/connection");
const router = require("./route");
const PORT = process.env.PORT || 3001;
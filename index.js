// Jemal Beshir Travel Planning App

const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const supabase = createClient(
    'https://wjvayyykiumrmvyqxiwp.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqdmF5eXlraXVtcm12eXF4aXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MTM0MzgsImV4cCI6MjA5NDI4OTQzOH0.-i18pN4JQSLOp7SA8sSwSBvgb5KLaEYcCC7l6HDL4g8'
);

const WEATHERSTACK_KEY = 'b40a43dcff1f17ae078a07e8797eabfb';
const AVIATIONSTACK_KEY = '58bfb5f71d9299ebdae2d163cfc5e9ba';

app.get('/api/history', async function(req, res) {
    try {
        const { data, error } = await supabase
            .from('search_history')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) throw error;

        res.json({ success: true, data: data });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/history', async function(req, res) {
    const search_type = req.body.search_type;
    const search_query = req.body.search_query;

    if (!search_type || !search_query) {
        return res.status(400).json({ success: false, error: 'Missing fields' });
    }

    try {
        const { data, error } = await supabase
            .from('search_history')
            .insert([{ search_type: search_type, search_query: search_query }])
            .select();

        if (error) throw error;

        res.json({ success: true, data: data });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/weather', async function(req, res) {
    var city = req.query.city;

    if (!city) {
        return res.status(400).json({ success: false, error: 'City is required' });
    }

    try {
        const response = await fetch(
            'http://api.weatherstack.com/current?access_key=' + WEATHERSTACK_KEY + '&query=' + encodeURIComponent(city)
        );
        const data = await response.json();

        if (data.error) {
            return res.status(400).json({ success: false, error: data.error.info });
        }

        res.json({ success: true, data: data });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/currency', async function(req, res) {
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();

        res.json({ success: true, data: data });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/flights', async function(req, res) {
    var flight = req.query.flight;

    if (!flight) {
        return res.status(400).json({ success: false, error: 'Flight number is required' });
    }

    try {
        const response = await fetch(
            'http://api.aviationstack.com/v1/flights?access_key=' + AVIATIONSTACK_KEY + '&flight_iata=' + encodeURIComponent(flight)
        );
        const data = await response.json();

        res.json({ success: true, data: data });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'jbeshir_project-home.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Server running on port ' + PORT);
});

module.exports = app;

import { useState } from 'react'
import './App.css'
import { Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material'
import axios from 'axios'

function App() {
  const [emailContent, setEmailContent] = useState('')
  const [tone, setTone] = useState('')
  const [loading, setLoading] = useState(false)
  const [generateReply, setGenerateReply] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      })

      setGenerateReply(
        typeof response.data === 'string'
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      console.error("Error generating reply:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email AI Assistant
      </Typography>

      <Box sx={{ m: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="tone-label">Tone (Optional)</InputLabel>
          <Select
            labelId="tone-label"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          sx={{ m: 3 }}
          onClick={handleSubmit}
          disabled={!emailContent || loading}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>
      </Box>

      <Box sx={{ m: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Generated Reply"
          value={generateReply || ''}
          sx={{ mb: 2 }}
          inputProps={{ readOnly: true }}
        />

        <Button
          variant="outlined"
          onClick={() => navigator.clipboard.writeText(generateReply)}
          disabled={!generateReply}
        >
          Copy To Clipboard
        </Button>
      </Box>
    </Container>
  )
}

export default App

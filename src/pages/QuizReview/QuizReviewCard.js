//
//  Libraries
//
import { Card, CardContent, Typography, Box } from '@mui/material'

export default function QuizReviewCard({ field, backgroundColor }) {
  if (!field) return null
  return (
    <>
      <Box sx={{ m: 1 }}>
        <Card
          elevation={1}
          style={{ backgroundColor: backgroundColor }}
          sx={{ padding: '4px' }}
        >
          <CardContent>
            <Typography variant='body2'>{field}</Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

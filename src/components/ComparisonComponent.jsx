import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, clearAllItems } from '../store/actions'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Table from '@mui/material/Table'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import '../css/ComparisonComponent.css'
const ComparisonComponent = () => {
  const dispatch = useDispatch()
  const selectedItemsLeft = useSelector((state) => state.selectedItemsLeft)

  const handleRemoveItem = (item, basket) => {
    dispatch(removeItem(item, 'selectedItemsLeft'))
  }

  const handleClearAll = () => {
    dispatch(clearAllItems())
  }

  return (
    <>
      <TableContainer
        sx={{ maxWidth: 450, maxHeight: 650 }}
        size="small"
        aria-label="a dense table"
      >
        <Grid container spacing={2}>
          <Grid item>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      Product Title:
                    </Typography>
                  </TableCell>
                  {selectedItemsLeft.map((item) => (
                    <TableCell key={item.product_id}>
                      {item.product_title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      Product Image:
                    </Typography>
                  </TableCell>
                  {selectedItemsLeft.map((item) => (
                    <TableCell key={item.product_id}>
                      <a
                        href={item.promotion_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={item.product_main_image_url}
                          alt=""
                          style={{ maxWidth: '100px', maxHeight: '100px' }}
                        />
                      </a>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      Price:
                    </Typography>
                  </TableCell>
                  {selectedItemsLeft.map((item) => (
                    <TableCell key={item.product_id}>
                      ${item.sale_price}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      Rating:
                    </Typography>
                  </TableCell>
                  {selectedItemsLeft.map((item) => (
                    <TableCell key={item.product_id}>
                      {item.evaluate_rate}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      Website:
                    </Typography>
                  </TableCell>
                  {selectedItemsLeft.map((item) => (
                    <TableCell key={item.product_id}>{item.name}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      Remove:
                    </Typography>
                  </TableCell>
                  {selectedItemsLeft.map((item) => (
                    <TableCell key={item.product_id}>
                      <Button
                        onClick={() => handleRemoveItem(item, 'left')}
                        className="btn-remove"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </TableContainer>
      <Button
        variant="outlined"
        onClick={handleClearAll}
        className="btn-clear-all"
      >
        Clear All
      </Button>
    </>
  )
}

export default ComparisonComponent

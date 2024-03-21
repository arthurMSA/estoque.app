import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ListProduct({
  products,
  onDelete,
  onEdit,
}) {
    return (
      <Grid
        container
        columnSpacing={1}
        rowSpacing={2}
        sx={{
          mt: 2
        }}
      >
        {products.map((product) =>
          <Grid
            key={product.id}
            item
            xs={12}
          >
            <Card
              variant='outlined'
              sx={{
                boxShadow: 0,
                minHeight: 1/1
              }}
            >
              <CardContent>
                <Grid
                  container
                  justifyContent='space-between'
                >
                <Grid
                  item
                  xs={6}
                >
                  <Typography
                    color='primary'
                    variant='h5'
                  >
                    { product.name }
                  </Typography>
                  <Typography
                    variant='subtitle2'
                  >
                    { product.amount } em estoque
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  alignSelf='center'
                >
                  <Typography variant='h6'>
                    { new Intl.NumberFormat('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(product.price) }
                  </Typography>
                  </Grid>
                <Grid
                  item
                  xs={3}
                  textAlign='end'
                  alignSelf='center'
                >
                  <IconButton
                    onClick={() => onEdit(product)}
                  >
                    <EditIcon
                      color='primary'
                      sx={{ height: 20, width: 20 }}
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(product.id)}
                  >
                    <DeleteIcon
                      color='error'
                      sx={{ height: 20, width: 20 }}
                    />
                  </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
        </Grid>
    )
}
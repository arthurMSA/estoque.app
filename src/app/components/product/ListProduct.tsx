import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Pagination,
  Box,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Product } from '@/app/entities/product'

type Props = {
  products: Product[],
  countProducts: number,
  currentPage: number,
  onDelete: Function,
  onEdit: Function,
  onPageChange: Function,
}

export default function ListProduct({
  products,
  countProducts,
  currentPage,
  onDelete,
  onEdit,
  onPageChange,
}: Props) {

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }).format(price) 
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {products.map((product) =>
          <Card
            key={product.id}
            variant='outlined'
            sx={{
              boxShadow: 0,
              minHeight: 1/1,
              mt: 2
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
                  { formatPrice(product.price | 0) }
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
      )}
      <Box
        alignSelf='center'
        sx={{
          mt: 4
        }}
      >
        <Pagination
          page={currentPage}
          count={Math.ceil(countProducts/5)}
          color='primary'
          onChange={(_, page: number) => onPageChange(page)}
        />
      </Box>
    </Box>
  )
}
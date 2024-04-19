import React, { useMemo } from "react";
import { HttpError, useList, useTranslate } from "@refinedev/core";
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import {
  RefineListView,
  CategoryStatus,
  CustomTooltip,
} from "../../components";
import { ICategory, IProduct } from "../../interfaces";

export const CategoryList = () => {
  const t = useTranslate();

  const { dataGridProps } = useDataGrid<ICategory, HttpError>({
    pagination: {
      mode: "off",
    },
  });

  const { data: productsData, isLoading: productsIsLoading } = useList<
    IProduct,
    HttpError
  >({
    resource: "products",
    pagination: {
      mode: "off",
    },
  });
  const products = productsData?.data || [];

  const columns = useMemo<GridColDef<ICategory>[]>(
    () => [
      {
        field: "title",
        headerName: t("categories.fields.title"),
        width: 232,
      },
      {
        field: "product",
        headerName: t("categories.fields.products"),
        flex: 1,
        renderCell: function render({ row }) {
          const categoryProducts = products.filter(
            (product) => product.category.id === row.id,
          );
          return (
            <Box display="flex" alignItems="center" gap="8px" flexWrap="wrap">
              {productsIsLoading &&
                Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <Skeleton
                      // biome-ignore lint/suspicious/noArrayIndexKey: <Skeleton /> not important to have unique key
                      key={index}
                      sx={{
                        width: "32px",
                        height: "32px",
                      }}
                      variant="rectangular"
                    />
                  );
                })}

              {!productsIsLoading &&
                categoryProducts.map((product) => {
                  const image = product.images?.[0];
                  const thumbnailUrl = image?.thumbnailUrl || image?.url;
                  return (
                    <CustomTooltip key={product.id} title={product.name}>
                      <Avatar
                        sx={{
                          width: "32px",
                          height: "32px",
                        }}
                        variant="rounded"
                        alt={product.name}
                        src={thumbnailUrl}
                      />
                    </CustomTooltip>
                  );
                })}
            </Box>
          );
        },
      },
      {
        field: "isActive",
        headerName: t("categories.fields.isActive.label"),
        width: 116,
        renderCell: function render({ row }) {
          return <CategoryStatus value={row.isActive} />;
        },
      },
    ],
    [t, products, productsIsLoading],
  );

  return (
    <RefineListView>
      <Paper>
        <DataGrid
          {...dataGridProps}
          sx={{}}
          columns={columns}
          autoHeight
          hideFooter
        />
      </Paper>
    </RefineListView>
  );
};

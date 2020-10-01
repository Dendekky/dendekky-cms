import React, { useState, useEffect } from "react"
import { AgGridReact } from "ag-grid-react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormInput,
} from "shards-react"
import { useRouter } from "next/router"
import { Eye, ChevronDown } from "react-feather"
import http from "../../services/Apicalls"
import LoadingAnimation from "../../components/common/Loading"
import PageTitle from "../../components/common/PageTitle"

const BlogTable = (props) => {
  const router = useRouter()
  const [blogPosts, setBlogPosts] = useState([])
  const [blogDrafts, setBlogDrafts] = useState([])
  const [loading, setLoading] = useState(true)

  const defaultColDef = {
    sortable: true,
  }

  const [draftNumberLengthToggle, setDraftNumberLengthToggle] = useState(false)
  const [draftPageSize, setDraftPageSize] = useState(20)
  const [draftSearchVal, setDraftSearchval] = useState("")
  const draftColumnDefs = [
    {
      headerName: "Title",
      field: "title",
      width: 250,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: "Category",
      field: "category",
      filter: true,
      width: 200,
    },
    // {
    //   headerName: "Comments",
    //   cellRendererFramework: params => params.data.comments.length,
    //   filter: true,
    //   width: 180,
    // },
    {
      headerName: "Date Published",
      field: "createdAt",
      //   cellRendererFramework: params => new Date(params.data.created_at),
      filter: true,
      width: 250,
    },
    {
      headerName: "Actions",
      width: 250,
      cellRendererFramework: (params) => {
        return (
          <div className="actions cursor-pointer">
            <Button
              color="info"
              size="sm"
              className="mr-50"
              onClick={() => router.push(`/admin/draft/${params.data._id}`)}
            >
              <Eye size={10} />
              <span className="align-middle ml-50">View</span>
            </Button>
          </div>
        )
      },
    },
  ]

  const [blogNumberLengthToggle, setBlogNumberLengthToggle] = useState(false)
  const [pageSize, setPageSize] = useState(20)
  const [searchVal, setSearchval] = useState("")
  const columnDefs = [
    {
      headerName: "Title",
      field: "title",
      width: 250,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: "Category",
      field: "category",
      filter: true,
      width: 200,
    },
    {
      headerName: "Comments",
      cellRendererFramework: (params) => params.data.comments.length,
      filter: true,
      width: 180,
    },
    {
      headerName: "Date Published",
      field: "createdAt",
      //   cellRendererFramework: params => new Date(params.data.created_at),
      filter: true,
      width: 200,
    },
    {
      headerName: "Actions",
      width: 250,
      cellRendererFramework: (params) => {
        return (
          <div className="actions cursor-pointer">
            <Button
              color="info"
              size="sm"
              className="mr-50"
              onClick={() => router.push(`/admin/post/${params.data.slug}`)}
            >
              <Eye size={10} />
              <span className="align-middle ml-50">View</span>
            </Button>
          </div>
        )
      },
    },
  ]

  const toggleBlogLength = () =>
    setBlogNumberLengthToggle(!blogNumberLengthToggle)

  const toggleDraftLength = () =>
    setDraftNumberLengthToggle(!draftNumberLengthToggle)

  const onGridReady = (params) => {
    AgGridReact.gridApi = params.api
    AgGridReact.gridColumnApi = params.columnApi
  }
  const filterSize = (val) => {
    if (AgGridReact.gridApi) {
      AgGridReact.gridApi.paginationSetPageSize(Number(val))
      setPageSize(val)
    }
  }
  const updateSearchQuery = (val) => {
    AgGridReact.gridApi.setQuickFilter(val)
    setSearchval(val)
  }
  const ListCount = () => {
    if (pageSize < blogPosts.length) {
      return pageSize
    }
    return blogPosts.length
  }

  const draftFilterSize = (val) => {
    if (AgGridReact.gridApi) {
      AgGridReact.gridApi.paginationSetPageSize(Number(val))
      setDraftPageSize(val)
    }
  }
  const updateDraftSearchQuery = (val) => {
    AgGridReact.gridApi.setQuickFilter(val)
    setDraftSearchval(val)
  }
  const DraftListCount = () => {
    if (draftPageSize < blogPosts.length) {
      return draftPageSize
    }
    return blogPosts.length
  }

  useEffect(() => {
    const fetchData = async () => {
      const allPosts = await http.get("/api/post")
      const allDrafts = await http.get("/api/draft")
      setBlogPosts(allPosts.data.posts.reverse())
      setBlogDrafts(allDrafts.data.drafts.reverse())
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <LoadingAnimation />
  }
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4 my-3">
        <PageTitle
          sm="4"
          title="Blog Posts"
          subtitle="Components"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col>
          <Card md="12" lg="12" className="ag-theme-material ag-grid-table">
            <CardBody>
              <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                <div className="sort-dropdown">
                  <Dropdown
                    open={blogNumberLengthToggle}
                    toggle={toggleBlogLength}
                    className="ag-dropdown p-1"
                  >
                    <DropdownToggle tag="div">
                      1 - {ListCount()} of {blogPosts.length}
                      <ChevronDown className="ml-50" size={15} />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag="div" onClick={() => filterSize(20)}>
                        20
                      </DropdownItem>
                      <DropdownItem tag="div" onClick={() => filterSize(50)}>
                        50
                      </DropdownItem>
                      <DropdownItem tag="div" onClick={() => filterSize(100)}>
                        100
                      </DropdownItem>
                      <DropdownItem tag="div" onClick={() => filterSize(150)}>
                        150
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="filter-actions d-flex">
                  <FormInput
                    className="w-90 mr-1 mb-1 mb-sm-0"
                    type="text"
                    placeholder="search..."
                    onChange={(e) => updateSearchQuery(e.target.value)}
                    value={searchVal}
                  />
                </div>
              </div>
              {blogPosts !== null ? (
                <AgGridReact
                  gridOptions={{}}
                  rowSelection="multiple"
                  defaultColDef={defaultColDef}
                  columnDefs={columnDefs}
                  rowData={blogPosts}
                  onGridReady={onGridReady}
                  colResizeDefault="shift"
                  animateRows
                  floatingFilter
                  pagination
                  pivotPanelShow="always"
                  paginationPageSize={pageSize}
                  resizable
                />
              ) : null}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row noGutters className="page-header py-4 my-3">
        <PageTitle
          sm="4"
          title="Drafts"
          // subtitle="Components"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col>
          <Card md="12" lg="12" className="ag-theme-material ag-grid-table">
            <CardBody>
              <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                <div className="sort-dropdown">
                  <Dropdown
                    open={draftNumberLengthToggle}
                    toggle={toggleDraftLength}
                    className="ag-dropdown p-1"
                  >
                    <DropdownToggle tag="div">
                      1 - {DraftListCount()} of {blogDrafts.length}
                      <ChevronDown className="ml-50" size={15} />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem
                        tag="div"
                        onClick={() => draftFilterSize(20)}
                      >
                        20
                      </DropdownItem>
                      <DropdownItem
                        tag="div"
                        onClick={() => draftFilterSize(50)}
                      >
                        50
                      </DropdownItem>
                      <DropdownItem
                        tag="div"
                        onClick={() => draftFilterSize(100)}
                      >
                        100
                      </DropdownItem>
                      <DropdownItem
                        tag="div"
                        onClick={() => draftFilterSize(150)}
                      >
                        150
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="filter-actions d-flex">
                  <FormInput
                    className="w-90 mr-1 mb-1 mb-sm-0"
                    type="text"
                    placeholder="search..."
                    onChange={(e) => updateDraftSearchQuery(e.target.value)}
                    value={draftSearchVal}
                  />
                </div>
              </div>
              {blogPosts !== null ? (
                <AgGridReact
                  gridOptions={{}}
                  rowSelection="multiple"
                  defaultColDef={defaultColDef}
                  columnDefs={draftColumnDefs}
                  rowData={blogDrafts}
                  onGridReady={onGridReady}
                  colResizeDefault="shift"
                  animateRows
                  floatingFilter
                  pagination
                  pivotPanelShow="always"
                  paginationPageSize={draftPageSize}
                  resizable
                />
              ) : null}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default BlogTable

import BaseAdminContainer from "components/BaseAdminContainer";
import CustomDataTable from "components/Core/CustomDataTable";
import React, { useEffect, useState } from "react";
import { CiExport } from "react-icons/ci";
import { RiAddCircleLine, RiDeleteBin6Line } from "react-icons/ri";
import { RouteBase } from "../../constants/routeUrl";
import { usePostData } from "../../hooks/services/usePostApi";
import { EDU_URL } from "../../constants/api";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import SchoolCreate from "./Modal/SchoolCreate";
import { useGetData } from "hooks/services/useGetApi";

export default function HighSchools() {
  const styleBtn = {
    color: "#5e72e4",
    cursor: "pointer",
    fontSize: 18,
    margin: 5,
  };

  function refreshTable() {
    setParamRequest({ ...paramRequest, page: 0 });
  }

  const Active = ({ status }) => {
    return status === "ACTIVE" ? (
      <Badge style={{ cursor: "pointer" }} color="success">
        Active
      </Badge>
    ) : (
      <Badge style={{ cursor: "pointer" }} color="warning">
        Inactive
      </Badge>
    );
  };

  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const columns = [
    {
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Tên trường",
      cell: (row) => {
        return (
          <Link to={`/admin${RouteBase.HighSchoolsDetail}?id=${row?.id}`}>
            {row?.name}
          </Link>
        );
      },
      sortable: true,
    },
    {
      name: "Địa chỉ",
      selector: (row) => row?.address,
      sortable: true,
      cell: (row) => {
        return row?.address;
      },
    },
    {
      name: "SL môn học",
      selector: (row) => row?.subjects,
      sortable: true,
      cell: (row) => {
        return row?.countSubjects;
      },
    },

    {
      name: "SL Học sinh",
      selector: (row) => row?.students,
      sortable: true,
      cell: (row) => {
        return row?.countStudents;
      },
    },
    {
      cell: (row) => {
        return <Active status={row.status} />;
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Trạng thái",
      sortable: true,
    },

    {
      cell: (row) => {
        return <RiDeleteBin6Line color="warning" style={styleBtn} />;
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Hành động",
    },
  ];
  const initParams = {
    page: 0,
    size: 20,
  };
  const [paramRequest, setParamRequest] = useState(initParams);

  const getHighShcools = usePostData(null, true, null, false, false);

  useEffect(() => {
    const payload = {
      filterQuery: {
        educationType: "HIGH SCHOOL",
      },
      options: {
        limit: 10,
        page: 1,
      },
    };
    getHighShcools._postData(EDU_URL.GET_UNIVERSITIES, payload).then();
  }, [paramRequest]);

  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="bg-secondary shadow border-0 mt-4">
          <CardHeader className="row panel-card-header-custom">
            <div
              className="d-flex"
              style={{ justifyContent: "space-between", width: "100%" }}
            >
              <h1>Danh sách trường TH Phổ thông</h1>

              <Input
                placeholder="Tìm kiếm tên, sđt, email..."
                style={{ width: "25%" }}
              />
            </div>
            <div
              className="d-flex mt-3"
              style={{ justifyContent: "space-between", width: "100%" }}
            >
              <div className="input-group-prepend">
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  className="mr-2"
                >
                  <option>Tất cả trạng thái</option>
                </Input>
              </div>
              <div>
                <Button
                  color="primary"
                  type="button"
                  onClick={() => setModalCreateOpen(true)}
                >
                  <RiAddCircleLine style={{ fontSize: 20 }} />
                  <span className="ml-1">Thêm</span>
                </Button>
                <Button color="primary" type="button">
                  <CiExport style={{ fontSize: 20 }} />
                  <span className="ml-1">Export</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <SchoolCreate
              isOpen={modalCreateOpen}
              setModalOpen={setModalCreateOpen}
              refreshParent={refreshTable}
            />
            <CustomDataTable
              selectableRows={true}
              data={getHighShcools?.data?.data?.docs}
              columns={columns}
              progressPending={getHighShcools?.isLoading}
              pagination
              paginationServer
              paginationTotalRows={
                getHighShcools?.data?.pagination?.totalRecords ?? 0
              }
              onChangeRowsPerPage={(val) => {
                setParamRequest({ ...paramRequest, size: val, page: 0 });
              }}
              onChangePage={(val) => {
                setParamRequest({ ...paramRequest, page: val - 1 });
              }}
            />
          </CardBody>
        </Card>
      </Container>
    </BaseAdminContainer>
  );
}

import BaseAdminContainer from "components/BaseAdminContainer";
import React, { useEffect, useState } from "react";
import { RiEdit2Line, RiDeleteBin6Line, RiAddCircleLine } from "react-icons/ri";
import { CiExport } from "react-icons/ci";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Input,
} from "reactstrap";
import { MdChevronLeft } from "react-icons/md";
import { Link } from "react-router-dom";

import { EDU_URL } from "constants/api";
import { useGetData } from "hooks/services/useGetApi";
import CustomDataTable from "components/Core/CustomDataTable";
import ClassCreate from "../Modal/ClassCreate";
import SchoolUpdate from "../Modal/SchoolUpdate";

export default function SigleSchool(props) {
  const ex = [
    { class: 12, subjects: 10, students: 800, status: "ACTIVE" },
    { class: 11, subjects: 18, students: 1200, status: "ACTIVE" },
    { class: 10, subjects: 12, students: 700, status: "ACTIVE" },
  ];
  const styleBtn = {
    color: "#5e72e4",
    cursor: "pointer",
    fontSize: 18,
    margin: 5,
  };
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);

  const columns = [
    {
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Lớp",
      cell: (row) => {
        return row?.class;
      },
      sortable: true,
    },
    {
      name: "Số lượng môn học",
      selector: (row) => row?.subjects,
      sortable: true,
      cell: (row) => {
        return row?.subjects;
      },
    },

    {
      name: "Số lượng Học sinh",
      selector: (row) => row?.students,
      sortable: true,
      cell: (row) => {
        return row?.students;
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
        return (
          <div>
            <RiDeleteBin6Line color="warning" style={styleBtn} />
            <RiEdit2Line
              style={styleBtn}
              onClick={() => setModalUpdateOpen(true)}
            />
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Hành động",
    },
  ];

  // const id = props?.location?.search?.id;
  const id = new URLSearchParams(props?.location?.search).get("id");
  const getHighShcools = useGetData(`${EDU_URL.GET_UNIVERSITY_DETAIL}/${id}`);

  const data = getHighShcools?.data;
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
  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="bg-secondary shadow border-0 mt-4">
          <CardHeader
            className="row panel-card-header-custom "
            style={{ display: "flex", alignItems: "baseline" }}
          >
            <Link
              to="/admin/high-schools"
              style={{ padding: 5, borderRadius: "50%" }}
            >
              <MdChevronLeft />
            </Link>
            <h2>Danh sách trường TH phổ thông / {data.name}</h2>
          </CardHeader>

          <CardBody>
            <SchoolUpdate
              isOpen={modalUpdateOpen}
              setModalOpen={setModalUpdateOpen}
              formValues={getHighShcools.data}
              // refreshParent={refreshTable}
            />
            <div
              className="d-flex"
              style={{ justifyContent: "center", width: "100%" }}
            >
              <Card
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "35%",
                  padding: 35,
                  background: "#ECF6FD",
                }}
              >
                {data.logo ? (
                  <img src={data.logo} alt="logo" width={120} />
                ) : (
                  <img
                    src="/static/media/mtz-logo.978a659e.svg"
                    alt="logo"
                    width={120}
                  />
                )}
                <h2 className="mt-4 mb-4" style={{ textAlign: "center" }}>
                  {data.name}
                </h2>
                <div>
                  <Active status={data.status} />
                  <Badge className="ml-4" color="primary">
                    ID: {data._id}
                  </Badge>
                </div>
              </Card>
              <Card
                className="ml-5 p-5"
                style={{ width: "68%", background: "#ECF6FD" }}
              >
                <p>
                  Địa chỉ: <b>{data.address}</b>
                </p>
                <div className="d-flex">
                  <p style={{ width: "45%" }}>
                    Số lượng môn học: <b>{data.subjects?.length}</b>
                  </p>
                  <p>
                    Số lượng học sinh: <b>{data.students?.length}</b>
                  </p>
                </div>
              </Card>
            </div>

            <div
              className="d-flex mt-5"
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="d-flex" style={{ alignItems: "baseline" }}>
                <h3>Danh sách</h3>
                <Card
                  className="p-1 pl-4 pr-4 ml-4"
                  style={{ color: "var(--teal)" }}
                >
                  Lớp
                </Card>
              </div>
              <div className="d-flex">
                <Input
                  placeholder="Tìm kiếm tên, sđt, email..."
                  style={{ width: "42%" }}
                />
                <div className="ml-3">
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
            </div>
            <ClassCreate
              isOpen={modalCreateOpen}
              setModalOpen={setModalCreateOpen}
            />

            <CustomDataTable
              selectableRows={true}
              data={ex}
              columns={columns}
              pagination
              paginationServer
            />
            <Button color="primary" onClick={function noRefCheck() {}}>
              Open
            </Button>
          </CardBody>
        </Card>
      </Container>
    </BaseAdminContainer>
  );
}

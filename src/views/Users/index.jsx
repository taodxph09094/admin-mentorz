import React, { useEffect, useState } from "react";
import BaseAdminContainer from "../../components/BaseAdminContainer";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { RouteBase } from "../../constants/routeUrl";
import { AUTH_URL, EDU_URL } from "../../constants/api";
import CustomDataTable from "../../components/Core/CustomDataTable";
import { usePostData } from "../../hooks/authServices/usePostApi";
import MCreate from "./Modal/MCreate";
const Users = (props) => {
  const initParams = {
    page: 0,
    size: 20,
  };
  const styleBtn = {
    color: "#5e72e4",
    cursor: "pointer",
    fontSize: 18,
    margin: 5,
  };
  let index;
  const columns = [
    {
      name: "STT",
      width: "8%",
      selector: (row) => index++,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <Link to={`/admin${RouteBase.UniversityDetail}?id=${row?.id}`}>
            {row?.fullName}
          </Link>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Họ tên",
      sortable: true,
      width: "20%",
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Số điện thoại",
      selector: (row) => row?.phoneNumber,
      sortable: true,
    },
    {
      name: "Học vấn",
      selector: (row) => row?.educationType,
      sortable: true,
    },
    {
      cell: (row) => {
        if (row.accountStatus) {
          return <Badge color="success">Active</Badge>;
        } else {
          return <Badge color="warning">No - action</Badge>;
        }
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Trạng thái",
      sortable: true,
    },

    {
      cell: (row) => {
        return (
          <>
            <AiOutlineEdit
              style={styleBtn}
              onClick={(event) => update(event, row)}
            />
            <AiOutlineDelete style={styleBtn} />
          </>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Hành động",
    },
  ];
  const [paramRequest, setParamRequest] = useState(initParams);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const update = async (e, value) => {
    // await getUserDetailById(value);
    setModalUpdateOpen(!modalUpdateOpen);
  };
  const refreshPage = () => {
    setParamRequest({ ...paramRequest, page: 0 });
  };
  const getUsers = usePostData(null, true, null, false, false);
  useEffect(() => {
    // setIndex(index + 1);
    const payload = {
      filterQuery: {},
      options: {
        limit: 10,
        page: 1,
      },
    };
    getUsers._postData(AUTH_URL.GET_USERS, payload).then();
  }, [paramRequest]);

  const create = () => {
    setModalCreateOpen(!modalCreateOpen);
  };
  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="bg-secondary shadow border-0 mt-4">
          <CardHeader className="row panel-card-header-custom">
            <h2 className="font-weight-bold col-sm-3">
              Danh sách tài khoản người dùng
            </h2>
            {/* <div className="col-sm-9 text-right">
              <Button color="primary" type="button" onClick={create}>
                Tạo tài khoản mới
              </Button>
            </div> */}
          </CardHeader>
          <CardBody>
            <CustomDataTable
              data={getUsers?.data?.data?.docs}
              columns={columns}
              progressPending={getUsers?.isLoading}
              pagination
              paginationServer
              paginationTotalRows={
                getUsers?.data?.pagination?.totalRecords ?? 0
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
        {/* <MCreate
          isOpen={modalCreateOpen}
          setModalOpen={setModalCreateOpen}
          refreshParent={refreshPage}
        /> */}
        {/* <MUpdate
      isOpen={modalUpdateOpen}
      setModalOpen={setModalUpdateOpen}
      refreshParent={refreshPage}
      formValues={getUniversities.data.data}
    /> */}
      </Container>
    </BaseAdminContainer>
  );
};

export default Users;

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
import { RouteBase } from "../../constants/routeUrl";
import { usePostData } from "../../hooks/services/usePostApi";
import { EDU_URL } from "../../constants/api";
import CustomDataTable from "../../components/Core/CustomDataTable";
import MCreate from "./Modal/MCreate";
const Universities = (props) => {
  const { refreshParent } = props;
  const initParams = {
    page: 0,
    size: 20,
  };
  const styleBtn = { color: "#5e72e4", cursor: "pointer", fontSize: 18 };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <Link to={`/admin${RouteBase.UniversityDetail}?id=${row?.id}`}>
            {row?.name}
          </Link>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Tên trường",
      sortable: true,
    },
    {
      name: "Tên viết tắt",
      selector: (row) => row?.shortName,
      sortable: true,
    },
    {
      cell: (row) => {
        if (row.status) {
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
            <i
              style={styleBtn}
              className="ni ni-check-bold mr-3"
              title="hi"
              //   title={t('users:button.update_info')}
              //   onClick={(event) => updateUser(event, row)}
            />
            <i
              style={styleBtn}
              className="ni ni-curved-next"
              title="ha"
              //   title={t('users:button.reset_pass')}
              //   onClick={(event) => resetPass(event, row)}
            />
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
  const [modalResetOpen, setModalResetOpen] = useState(false);
  const refreshPage = () => {
    setParamRequest({ ...paramRequest, page: 0 });
  };
  const getUniversities = usePostData(null, true, null, false, false);
  useEffect(() => {
    const payload = {
      filterQuery: {
        educationType: "UNIVERSITY",
      },
      options: {
        limit: 10,
        page: 1,
      },
    };
    getUniversities._postData(EDU_URL.GET_UNIVERSITIES, payload).then();
  }, [paramRequest]);

  const create = () => {
    setModalCreateOpen(!modalCreateOpen);
  };
  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="bg-secondary shadow border-0 mt-4">
          <CardHeader className="row panel-card-header-custom">
            <h1 className="font-weight-bold col-sm-3">
              Danh sách trường đại học
            </h1>
            <div className="col-sm-9 text-right">
              <Button color="primary" type="button" onClick={create}>
                Thêm trường
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <CustomDataTable
              data={getUniversities?.data?.data?.docs}
              columns={columns}
              progressPending={getUniversities?.isLoading}
              pagination
              paginationServer
              paginationTotalRows={
                getUniversities?.data?.pagination?.totalRecords ?? 0
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
        <MCreate
          isOpen={modalCreateOpen}
          setModalOpen={setModalCreateOpen}
          refreshParent={refreshPage}
        />
        {/* <MCreateUser isOpen={modalCreateOpen} setModalOpen={setModalCreateOpen} refreshParent={refreshPage} /> */}
      </Container>
    </BaseAdminContainer>
  );
};

export default Universities;

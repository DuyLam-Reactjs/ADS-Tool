import React from 'react'
import TablesContentProviderList from "../../base/tables/TablesContentProviderList";
import {CCol, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const ContentProviderList = () => {
  return (
    <div>
      <h2><strong>Content Provider List</strong></h2>
      <CRow className={'row my-2 mx-0'}>
        <CCol  className="col-sm-6 form-inline p-0 c-datatable-filter">
          <CInputGroup className="mb-3">
            <CInput type="text" placeholder="Tìm Content Provider" autoComplete="search" />
            <CInputGroupPrepend style={{cursor: 'pointer'}}>
              <CInputGroupText>
                <CIcon name="cil-search"/>
              </CInputGroupText>
            </CInputGroupPrepend>
          </CInputGroup>
        </CCol>
        <CCol  className="col-sm-6 p-0 ">
          <div className="form-inline justify-content-sm-end c-datatable-items-per-page">
            <button className="btn btn-success mb-3" >
              Thêm Content Provider
            </button>
          </div>
        </CCol>
      </CRow>
      <TablesContentProviderList/>
    </div>
  )
}
export default ContentProviderList

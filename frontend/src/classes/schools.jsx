class School {
    constructor(
      school_name,
      url_address,
      address,
      postal_code,
      telephone_no,
      telephone_no_2,
      fax_no,
      fax_no_2,
      email_address,
      mrt_desc,
      bus_desc,
      principal_name,
      first_vp_name,
      second_vp_name,
      third_vp_name,
      fourth_vp_name,
      fifth_vp_name,
      sixth_vp_name,
      dgp_code,
      zone_code,
      type_code,
      nature_code,
      session_code,
      mainlevel_code,
      sap_ind,
      autonomous_ind,
      gifted_ind,
      ip_ind,
      mothertongue1_code,
      mothertongue2_code,
      mothertongue3_code,
      latitude,
      longitude
    ) {
      this.school_name = school_name;
      this.url_address = url_address;
      this.address = address;
      this.postal_code = postal_code;
      this.telephone_no = telephone_no;
      this.telephone_no_2 = telephone_no_2;
      this.fax_no = fax_no;
      this.fax_no_2 = fax_no_2;
      this.email_address = email_address;
      this.mrt_desc = mrt_desc;
      this.bus_desc = bus_desc;
      this.principal_name = principal_name;
      this.first_vp_name = first_vp_name;
      this.second_vp_name = second_vp_name;
      this.third_vp_name = third_vp_name;
      this.fourth_vp_name = fourth_vp_name;
      this.fifth_vp_name = fifth_vp_name;
      this.sixth_vp_name = sixth_vp_name;
      this.dgp_code = dgp_code;
      this.zone_code = zone_code;
      this.type_code = type_code;
      this.nature_code = nature_code;
      this.session_code = session_code;
      this.mainlevel_code = mainlevel_code;
      this.sap_ind = sap_ind;
      this.autonomous_ind = autonomous_ind;
      this.gifted_ind = gifted_ind;
      this.ip_ind = ip_ind;
      this.mothertongue1_code = mothertongue1_code;
      this.mothertongue2_code = mothertongue2_code;
      this.mothertongue3_code = mothertongue3_code;
      this.latitude = latitude;
      this.longitude = longitude;
    }
  
    // Getter methods
    getSchoolName() {
      return this.school_name;
    }
  
    getAddress() {
      return this.address;
    }
  
    getPostalCode() {
      return this.postal_code;
    }
  
    getEmailAddress() {
      return this.email_address;
    }
  
    getLatitude() {
      return this.latitude;
    }
  
    getLongitude() {
      return this.longitude;
    }

    getFullAddress() {
      return `${this.address} ${this.postal_code}`;
    }
  
    getContactInfo() {
      return {
        telephone: this.telephone_no,
        fax: this.fax_no,
        email: this.email_address,
      };
    }
  }
  
  export default School;
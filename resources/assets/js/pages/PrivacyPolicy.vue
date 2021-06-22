<template>
  <div class="container--small">
    <v-card
      class="text-center pa-3 mt-3 my-3"
      title
      elevation="0"
      style="margin-bottom: 70px !important;"
    >
      <v-card-title class="pa-1 mt-2 mx-0 text-left justify-center">{{
        $t("PrivacyPolicy.title")
      }}</v-card-title>
      <v-card-text
        v-html="$t('PrivacyPolicy.content')"
        class="pa-1 mt-2 mx-0 text-left"
      >
        <!-- <h3>
          Personal Data collected for the following purposes and using the
          following services:
        </h3>
        <br />
        <h4>Analytics</h4>
        Google Analytics<br /><span class="font-italic">
          Personal Data: Cookies; Usage Data</span
        >
        <br />
        <br />
        <h4>Content commenting</h4>
        Comment system managed directly<br /><span class="font-italic"
          >Personal Data: Cookies; email address; username</span
        >
        <br />
        <br />
        <h4>Heat mapping and session recording</h4>
        Microsoft Clarity
        <br /><span class="font-italic"
          >Personal Data: Cookies; Usage Data; various types of Data as
          specified in the privacy policy of the service
        </span>
        <br />
        <br />
        <h4>Hosting and backend infrastructure</h4>
        Amazon Web Services (AWS) and GitHub Pages
        <br /><span class="font-italic"
          >Personal Data: various types of Data as specified in the privacy
          policy of the service</span
        >
        <br />
        <br />
        <h4>Interaction with external social networks and platforms</h4>
        Twitter Tweet button and social widgets
        <br /><span class="font-italic"
          >Personal Data: Cookies; Usage Data
        </span>
        <br />
        <br />
        <h4>Registration and authentication</h4>
        Facebook Authentication, Google OAuth and Twitter OAuth
        <br /><span class="font-italic"
          >Personal Data: various types of Data as specified in the privacy
          policy of the service</span
        >
        <br />
        Direct registration
        <br /><span class="font-italic"
          >Personal Data: email address; password; picture; User ID; username;
        </span>
        <br />
        <br />
        <v-divider></v-divider>
        <br />
        <h3>
          Further information about Personal Data
        </h3>
        <br />
        <h4>Data privacy</h4>
        We will process Personal Information in a manner that is compatible with
        and relevant to the purpose for which it was collected or authorised by
        you. We do not use or share personal information to target advertising.
        We use aggregate or anonymous information for other purposes such as to
        evaluate, develop, improve and market our services.<br /><br />
        We will not share, sell, rent or swap the personal information we
        collect or maintain to any third party for any reason, including that we
        do not sell or otherwise share personal information with direct
        marketers, advertisers, or data brokers.<br /><br />
        To prevent unauthorised access, maintain data accuracy and ensure the
        appropriate use of information we gather about you, we have taken
        commercially reasonable steps to protect the information. All Personal
        Information is protected according to industry standard security
        protocols. Data is located in datacenter facilities using industry
        standard access control protections.<br /><br />
        We use SSL encryption to ensure data privacy of transmitted data. SSL is
        a browser technology that encrypts the data transmitted between your
        computer and our servers. However, no method of transmission over the
        Internet, or method of electronic storage, is 100% secure.<br /><br />
        You may correct or update your registered details on your profile
        settings page. You can do this by visiting your profile settings page:
        https://youclip.app/mypage/edit. Where your user profile does not allow
        you to correct or update your details, or where you wish your personal
        data to be removed from our systems contact us via youclipteam@gmail.com<br />
        <br />
        <br />
        <h4>Cookies</h4>
        Cookies are small files that are stored on your computer (unless you
        block them). We use cookies to understand and save your preferences for
        future visits and compile aggregate data about site traffic and site
        interaction so that we can offer better site experiences and tools in
        the future. We may contract with third-party service providers to assist
        us in better understanding our site visitors. These service providers
        are not permitted to use the information collected on our behalf except
        to help us conduct and improve our business.<br /><br />
        Cookies may be set by other organisation. These “third-party cookies”
        may, for example, originate from websites such as YouTube, Twitter,
        Facebook, Google or other social media services. Since the cookie
        policies of these sites change over time, you should determine their
        policies by visiting the privacy policy pages of these sites directly.
        You may disable cookies through your individual browser options. If you
        would like to learn more about cookies please refer to the following
        website: http://www.allaboutcookies.org/
        <br />
        <br />
        <v-divider></v-divider>
        <br />
        <h3>
          Contact information
        </h3>
        <br />
        <h4>Owner and Data Controller</h4>
        YouClip<br />
        <br />Owner contact email: youclipteam@gmail.com
        <br />
        <br /> -->
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      meta: [
        {
          name: "robots",
          content: "noindex",
        },
      ],
    };
  },
  mounted() {
    //ナビバーのデータをリセットし表示
    this.$store.commit("navbar/resetNavbar");
    this.$store.commit("navbar/setShowNavbar", true);
  },
};
</script>

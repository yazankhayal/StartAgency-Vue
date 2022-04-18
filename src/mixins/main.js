export default {
    data(){
        return{
            layoutContents: {
                'id' : 0,
                'name' : '',
                'slug' : '',
                'default_image' : '',
                'logo_header' : '',
                'logo_footer' : '',
                'fav' : '',
                'email' : '',
                'description' : '',
                'iframe' : '',
                'masterContentsUrl' : '',
                'publicUrl' : '',
            },
        }
    },
    created() {
        this.getContents()
    },
    methods:{
        getContents(){
            this.axios.get(this.getSiteURL())
                .then(function (response) {
                    if (response.data['status'] === "success") {
                        let data = response.data['data'];
                        document.title = data['name'];
                        var link = document.querySelector("link[rel~='icon']");
                        if (!link) {
                            link = document.createElement('link');
                            link.rel = 'icon';
                            document.getElementsByTagName('head')[0].appendChild(link);
                        }
                        link.href = this.getPublicUrl() + data['fav'];
                        this.layoutContents.id = data['id'];
                        this.layoutContents.name = data['name'];
                        this.layoutContents.slug = data['slug'];
                        this.layoutContents.default_image = this.getPublicUrl() + data['default_image'];
                        this.layoutContents.logo_header = this.getPublicUrl() + data['logo_header'];
                        this.layoutContents.logo_footer = this.getPublicUrl() + data['logo_footer'];
                        this.layoutContents.email = this.getPublicUrl() + data['email'];
                        this.layoutContents.description = data['description'];
                        this.layoutContents.fav = this.getPublicUrl() + data['fav'];
                        this.layoutContents.iframe = this.getPublicUrl() + data['iframe'];
                        this.layoutContents.masterContentsUrl = this.getMasterUrl() + 'site/contents';
                        this.layoutContents.publicUrl = this.getPublicUrl();
                        if(!this.getLocalStorage('siteID')){
                           this.setLocalStorage('siteID',data['id'])
                        }
                        if(!this.getLocalStorage('siteSlug')){
                           this.setLocalStorage('siteSlug',data['slug'])
                        }
                        if(!this.getLocalStorage('getMasterUrl')){
                           this.setLocalStorage('getMasterUrl',this.getMasterUrl())
                        }
                        if(!this.getLocalStorage('masterContentsUrl')){
                           this.setLocalStorage('masterContentsUrl',this.getMasterUrl() + 'site/contents')
                        }
                        if(!this.getLocalStorage('publicUrl')){
                           this.setLocalStorage('publicUrl',this.getPublicUrl())
                        }
                    }
                }.bind(this));
        },
        getMasterUrl(){
            return  "https://backend-portfolio.yazan-khayal.co.uk/api/";
        },
        getPublicUrl(){
            return  "https://backend-portfolio.yazan-khayal.co.uk/public/";
        },
        getSiteURL(){
            return this.getMasterUrl() + 'site/start-vue-js';
        },
        getContentsRL(){
            return this.getMasterUrl() + 'site/contents/';
        },
        setLocalStorage(key,input){
            localStorage.setItem(key, input)
        },
        getLocalStorage(key){
            return localStorage.getItem(key)
        },
        dateFormat(date){
            return new Date(date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        }
    }
}
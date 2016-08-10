var Comida = React.createClass({
    displayName: "Comida",

    getInitialState: function () {
        return {
            like: Boolean(this.props.like),
            editing: false
        };
    },
    handleLike: function () {
        this.setState({ like: !this.state.like });
    },
    edit: function () {
        this.setState({ editing: true });
    },
    remove: function () {
        this.props.onRemove(this.props.index);
    },
    cancel: function () {
        this.setState({ editing: false });
    },
    save: function () {
        this.props.onChange(this.refs.nuevaNombre.value, this.props.index);
        this.setState({ editing: false });
    },
    showEditingView: function () {
        return React.createElement(
            "div",
            { className: "comida" },
            React.createElement("input", { ref: "nuevaNombre", type: "text", className: "form-control", placeholder: "nuevo Nombre...", defaultValue: this.props.nombre }),
            React.createElement(
                "div",
                null,
                React.createElement("div", { className: "glyphicon glyphicon-ok-circle blue", onClick: this.save }),
                React.createElement("div", { className: "glyphicon glyphicon-remove-circle red", onClick: this.cancel })
            )
        );
    },
    showFinalView: function () {
        return React.createElement(
            "div",
            { className: "comida" },
            React.createElement(
                "h1",
                { className: "bg-success" },
                this.props.nombre
            ),
            React.createElement(
                "p",
                { className: "bg-info" },
                "Posición ",
                React.createElement(
                    "i",
                    null,
                    this.props.children
                )
            ),
            React.createElement(
                "div",
                null,
                React.createElement("input", { onChange: this.handleLike, defaultChecked: this.state.like, type: "checkbox", className: "glyphicon glyphicon-heart glyphicon-heart-lg" }),
                React.createElement("br", null),
                "Like: ",
                React.createElement(
                    "b",
                    null,
                    String(this.state.like)
                )
            ),
            React.createElement(
                "div",
                null,
                React.createElement("div", { className: "glyphicon glyphicon-pencil blue", onClick: this.edit }),
                React.createElement("div", { className: "glyphicon glyphicon-trash red", onClick: this.remove })
            )
        );
    },
    render: function () {
        if (this.state.editing) {
            return this.showEditingView();
        } else {
            return this.showFinalView();
        }
    }
});

var ListaComida = React.createClass({
    displayName: "ListaComida",

    getInitialState: function () {
        return {
            comidas: ['Prba1', 'Prba2', 'Prba3']
        };
    },
    getDefaultProps: function () {
        return {
            framework: "ReactJS",
            tech: "JavaScript"
        };
    },
    componentWillMount: function () {
        //El componente Will Mount sirve para ejecutar algo antes de cargar
        //alert("Antes de cargar");
        var pais;
        var self = this;
        $.getJSON("https://restcountries.eu/rest/v1/all", function (data) {
            for (pais in data) {
                console.log(pais, data[pais].name);
                self.add(data[pais].name);
            }
            $(self.refs.spinner).removeClass("glyphicon-refresh-animate");
            $(self.refs.spinner).hide();
        });
    },
    componentDidMount: function () {
        $(this.refs.spinner).addClass("glyphicon-refresh-animate");
    },
    add: function (comida) {
        var nuevaComida = this.refs.nuevaComida.value;
        if (nuevaComida == "") {
            if (typeof comida == 'undefined') {
                nuevaComida = "Nueva Comida";
            } else {
                nuevaComida = comida;
            }
        }
        var arr = this.state.comidas;
        arr.push(nuevaComida);
        this.setState({ comidas: arr });
        this.refs.nuevaComida.value = "";
    },
    update: function (nuevaNombre, i) {
        var arr = this.state.comidas;
        arr[i] = nuevaNombre;
        this.setState({ comidas: arr });
    },
    remove: function (i) {
        var arr = this.state.comidas;
        arr.splice(i, 1);
        this.setState({ comidas: arr });
    },
    eachItem: function (comida, i) {
        return React.createElement(
            Comida,
            { key: i, index: i, nombre: comida, onRemove: this.remove, onChange: this.update },
            i + 1
        );
    },
    handleKeyDown: function (e) {
        if (e.charCode === 13) {
            this.add();
        }
    },
    render: function () {
        return React.createElement(
            "div",
            { className: "centerBlock bg-info" },
            React.createElement(
                "header",
                null,
                React.createElement(
                    "h1",
                    null,
                    "AAAAAAAAAA"
                ),
                React.createElement(
                    "i",
                    null,
                    "Total: ",
                    this.state.comidas.length
                ),
                React.createElement("br", null),
                React.createElement("span", { ref: "spinner", className: "glyphicon glyphicon-refresh" }),
                React.createElement("br", null),
                React.createElement(
                    "span",
                    null,
                    "App realizada con ",
                    this.props.framework,
                    " una libreria de ",
                    this.props.tech
                )
            ),
            React.createElement(
                "div",
                { className: "input-group" },
                React.createElement("input", { ref: "nuevaComida", type: "text", className: "form-control", placeholder: "agregar nuevo", onKeyPress: this.handleKeyDown }),
                React.createElement(
                    "span",
                    { className: "input-group-btn" },
                    React.createElement(
                        "div",
                        { className: "btn btn-defaul btn-success", onClick: this.add.bind(null, "Nueva Comida") },
                        " + "
                    )
                )
            ),
            React.createElement(
                "div",
                null,
                this.state.comidas.map(this.eachItem)
            )
        );
    }
});
ReactDOM.render(React.createElement(ListaComida, null), document.getElementById('container'));
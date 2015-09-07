var Seemly = (function(Seemly) {

	var scripts = document.getElementsByTagName( 'script' );
	var me = scripts[ scripts.length - 1 ];

	function walkTheDom(node, func) {
		func(node);
		node = node.firstChild;
		while (node) {
			walkTheDOM(node, func);
			node = node.nextSibling;
		}
	}

	function getHtmlIdentifier(node) {
		var outer = node.outerHTML;
		var id = outer.substring(0, outer.indexOf('>')+1);
		var contents = "";
		for(var i = 0; i < node.childNodes.length; i++) {
			if(node.childNodes[i].nodeType == Node.TEXT_NODE) {
				contents += node.childNodes[i].textContent + " ";
			}
		}
		return $.trim((id + contents).replace(/[\n\r\s]+/, ' '));
	}

	function walkTheDomDiff(node1, node2, func) {

		for(var i = 0; i < Math.max(node1.children.length, node2.children.length); i++) {
			var child1 = node1.children[i];
			var child2 = node2.children[i];

			if(child1 && child1.tagName == "SCRIPT") {
				continue;
			}

			if(child2 && child2.tagName == "SCRIPT") {
				continue;
			}

			if (child1 && child2 == null) {
				func({
					"operation": "insert",
					"parent": node2,
					"element": child1,
					"index": i,
				});
			}

			var child1 = node1.children[i];
			var child2 = node2.children[i];

			if (child2 && child1 == null) {
				func({
					"operation": "remove",
					"parent": node1,
					"element": child2,
					"index": i,
				});
			}
			
			var child1 = node1.children[i];
			var child2 = node2.children[i];

			if(child1 && child2 && getHtmlIdentifier(child1) != getHtmlIdentifier(child2)) {
				func({
					"operation": "replace",
					"element1": child1,
					"element2": child2,
					"index": i,
				});
			}

			/*if(child2 == null) {
				func({
					"operation": "insert",
					"parent": node2,
					"element": child1,
					"index": i,
				});
			} else if (child1 == null) {
				func({
					"operation": "remove",
					"parent": node1,
					"element": child2,
					"index": i,
				});

			} else if(getHtmlIdentifier(child1) != getHtmlIdentifier(child2)) {
				func({
					"operation": "replace",
					"element1": child1,
					"element2": child2,
					"index": i,
				});
			} else {*/

				var child1 = node1.children[i];
				var child2 = node2.children[i];

				if(child1 && child2) {
					walkTheDomDiff(child1, child2, func);
				}

			//}

		}
	}

	function getSelectorPath (current) {
		if (current.length != 1) return "";

		var path, node = current;
		while (node.length) {
			var realNode = node[0];
			var name = (

				// IE9 and non-IE
				realNode.localName ||

				// IE <= 8
				realNode.tagName ||
				realNode.nodeName

			);

			// on IE8, nodeName is '#document' at the top level, but we don't need that
			if (!name || name == '#document') break;
			if (!name || name == 'body') break;

			name = name.toLowerCase();
			if (realNode.id) {
				// As soon as an id is found, there's no need to specify more.
				return name + '#' + realNode.id + (path ? '>' + path : '');
			} else if (realNode.className) {
				name += '.' + realNode.className.split(/\s+/).join('.');
			}

			var parent = node.parent(), siblings = parent.children(name);
			if (siblings.length > 1) name += ':eq(' + siblings.index(node) + ')';
			path = name + (path ? '>' + path : '');

			node = parent;
		}

		return path;
	}

	function insertAtIndex(container, i, element) {
		if(i === 0) {
			container.prepend(element);        
			return;
		} else if(i == 'end') {
			container.append(element);        
			return;
		}

		container.children().eq(i-1).after(element);
	}

	function setPreloaderText(form, text) {
		form.find("*[data-seemly-preloader-text]").each(function() {
			if(text == undefined) {
				var value = this.getAttribute("data-seemly-preloader-text");
			} else if (text === 'original') {
				value = $(this).data("original-text");
			} else {
				value = text; //shortify this!
			}
			if(this.tagName.toLowerCase() == "input") {
				if(text != 'original') {
					$(this).data("original-text", this.value);
				}
				this.value = value;
			} else {
				if(text != 'original') {
					$(this).data("original-text", $(this).text());
				}
				$(this).text(value);
			}
		});
	}

	function setPreloaderError(form, text) {
		form.find("*[data-seemly-preloader-error]").each(function() {
			if(text == undefined) {
				var value = this.getAttribute("data-seemly-preloader-error");
			} else if (text === 'original') {
				value = $(this).data("original-error");
			} else {
				value = text; //shortify this!
			}
			if(this.tagName.toLowerCase() == "input") {
				if(text != 'original') {
					$(this).data("original-error", this.value);
				}
				this.value = value;
			} else {
				if(text != 'original') {
					$(this).data("original-error", $(this).text());
				}
				$(this).text(value);
			}
		});
	}

	function setPreloaderClass(form, text) {
		form.find("*[data-seemly-preloader-class]").each(function() {
			if(text == undefined) {
				var value = this.getAttribute("data-seemly-preloader-class");
			} else {
				value = text; //shortify this!
			}

			if(text == "original") {
				var original = ($(this).data("original-class") ?  $(this).data("original-class") : '' );
				$(this).attr("class", original)
			} else {
				$(this).data("original-class", $(this).attr("class"));
				$(this).addClass(value);
			}

		});
	}

	$(function() {

		var currentScript = $(me);

		if(currentScript.is("*[data-seemly-express]")) {
			// Express setup: automatically seemify all the forms!
			$("form").attr("data-seemly","");
			// TODO: minify these
			$("form input[type='submit']").attr("data-seemly-preloader-text","Loading...");
			$("form button[type='submit']").attr("data-seemly-preloader-text","Loading...");
			$("form .submit").attr("data-seemly-preloader-text","Loading...");
		}

		$("form[data-seemly]").each(function() {
			var form = $(this);

			form.data("cachedHTML", form.prop('outerHTML'));

			form.submit(function() {
				var form = $(this);

				form.data("path", getSelectorPath(form));
				setPreloaderText(form);
				setPreloaderClass(form);

				//var formData = (form.serialize());
				var formData = new FormData(this);

				$.ajax({
					url     : form.attr('action'),
					type    : form.attr('method'),
					data    : formData,
					context : form,
					dataType: 'text',
		            cache: false,
		            contentType: false,
		            processData: false,
				}).done(function(data, textStatus,xhr) {
					var form = $(this);
					var algo = form.attr("data-seemly");

					var path = form.data("path");
					
					var form1 = $("<span>" + data.replace("<body", "<divbody").replace("</body>", "</divbody>") + "</span>").find(path).get(0);
					//var form2 = form.get(0); // use the cached HTML because... JS based layouts :/
					var form2 = $(form.data("cachedHTML")).get(0);

					if(algo == undefined || algo == "" || algo == "diff") {
						var dd = new diffDOM();
						var diff = dd.diff(form2, form1);
						dd.apply(form.get(0), diff);
						form.data("cachedHTML", form.prop('outerHTML'));
						//form.get(0).reset();
					} else if(algo == "replace") {
						form.replaceWith($(form1));
					}

					setPreloaderText(form, "original");
					setPreloaderClass(form, "original");

				}).fail(function(xhr, err) {
					var form = $(this);
					setPreloaderText(form, xhr.statusText);
					setPreloaderClass(form, "original");

				}).always(function() {
					var form = $(this);
				});

				return false;
			});

		});

	});

})(Seemly || {});
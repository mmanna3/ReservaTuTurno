

using Api;
using Microsoft.AspNetCore.Mvc.Testing;

namespace TestsDeIntegracion;

public class Tests : WebApplicationFactory<Program>
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public void Test1()
    {
        Assert.Pass();
    }
}